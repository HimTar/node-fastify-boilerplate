import { FastifyPluginAsync } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { BadRequest } from "http-errors";

import { randomUUID } from "../../external/uuid";
import { getNextDay } from "../../libraries/time";
import {
  closeAccountVerification,
  closeSession,
  createAccountVerification,
  createSession,
  createUser,
  queryAccountVerification,
  querySession,
  queryUser,
  updateUser,
} from "./queries";
import { Login, Register } from "./schema";
import { generateEmailVerificationMail } from "./utils";

const routes: FastifyPluginAsync = async function (app) {
  app.post<{ Body: FromSchema<typeof Login> }>(
    "/auth/login",
    {
      schema: {
        body: Login,
      },
    },
    async function (req, reply) {
      const { email, password } = req.body;

      // validate credentials
      const user = await queryUser(this.Mongo, { email, active: true });

      if (!user) {
        throw new BadRequest("Invalid email");
      }

      if (!this.Encrypt.compareData(password, user.password)) {
        throw new BadRequest("Invalid password");
      }

      // close current session
      const currentSession = await querySession(this.Mongo, {
        userId: user._id,
        active: true,
      });

      if (currentSession) {
        await closeSession(this.Mongo, {
          _id: currentSession._id,
          active: true,
        });
      }

      // create session
      const token = randomUUID();
      const now = new Date();

      await createSession(this.Mongo, {
        userId: user._id,
        token,
        createdAt: now,
        expireAt: getNextDay(now),
        active: true,
      });

      return reply.send({
        email,
        token,
      });
    }
  );

  app.post<{ Body: FromSchema<typeof Register> }>(
    "/auth/register",
    {
      schema: {
        body: Register,
      },
    },
    async function (req, reply) {
      const now = new Date();
      const { email, password, username } = req.body;

      // validate credentials
      const existingUser = await queryUser(this.Mongo, { email, active: true });

      if (existingUser) {
        throw new BadRequest("Account with email already exists");
      }

      // Create user
      const encryptedPassword = await this.Encrypt.encrypt(password);
      const newUser = await createUser(this.Mongo, {
        email,
        password: encryptedPassword,
        username,
        active: true,
        isEmailVerified: false,
        createdAt: now,
        updatedAt: now,
      });
      const newUserId = newUser.insertedId;

      // Close existing account verification requests
      await closeAccountVerification(this.Mongo, {
        userId: newUserId,
        active: true,
      });

      // send email verification mail
      const verificationToken = randomUUID();

      await createAccountVerification(this.Mongo, {
        userId: newUserId,
        token: verificationToken,
        type: "EMAIL",
        otp: "",
        createdAt: now,
        expireAt: getNextDay(now),
        active: true,
      });

      await this.Email.sendEmail({
        to: email,
        subject: "Email Verification Required",
        html: generateEmailVerificationMail(username, verificationToken),
      });

      return reply.send("OK");
    }
  );

  app.get<{ Params: { token: string } }>(
    "/auth/verify/email/:token",
    {
      schema: {
        params: {
          token: { type: "string" },
        },
      },
    },
    async function (req, reply) {
      const now = new Date();
      const { token } = req.params;

      const verificationRequest = await queryAccountVerification(this.Mongo, {
        token,
        type: "EMAIL",
        active: true,
      });

      if (!verificationRequest || now > verificationRequest.expireAt) {
        throw new BadRequest(
          "Account verification request invalid or is expired!"
        );
      }

      // mark email verified
      await updateUser(
        this.Mongo,
        { _id: verificationRequest.userId },
        { isEmailVerified: true }
      );

      await closeAccountVerification(this.Mongo, {
        _id: verificationRequest._id,
      });

      return reply.send("OK");
    }
  );
};

export default routes;
