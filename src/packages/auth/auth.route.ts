import { FastifyPluginAsync } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { BadRequest } from "http-errors";

import UserModel from "./repository";
import { Login, Register } from "./schema";
import { queryBrandById } from "../brand/utils";
import { randomUUID } from "../../external/uuid";
import { queryBrandByEmailDomain } from "../brand/library";

const routes: FastifyPluginAsync = async function (app) {
  app.post<{ Body: FromSchema<typeof Login> }>(
    "/auth/brand/login",
    {
      schema: {
        body: Login,
      },
    },
    async function (req, reply) {
      const { email, password } = req.body;

      // validate credentials
      const [user] = await UserModel.query("email").eq(email).exec();

      if (!user) {
        throw new BadRequest("Invalid email");
      }

      if (!(await this.Encrypt.compareData(password, user.password))) {
        throw new BadRequest("Invalid password");
      }

      // Create token
      const token = await this.Encrypt.encryptToken({
        email,
        brandId: user.brandId ?? "",
      });

      // fetch brand info
      const brandInfo = user.brandId
        ? await queryBrandById(user.brandId)
        : null;

      return reply.send({
        email,
        token,
        brandInfo,
      });
    }
  );

  app.post<{ Body: FromSchema<typeof Register> }>(
    "/auth/brand/register",
    {
      schema: {
        body: Register,
      },
    },
    async function (req, reply) {
      const now = new Date();
      const { name, email, password } = req.body;

      // validate credentials
      const [existingUser] = await UserModel.query("email").eq(email).exec();

      if (existingUser) {
        throw new BadRequest("Account with email already exists");
      }

      // fetch brand info
      const brandInfo = await queryBrandByEmailDomain(email.split("@")[1]);

      if (!brandInfo) {
        throw new BadRequest("Email domain is not registered");
      }

      // Create user
      const encryptedPassword = await this.Encrypt.encrypt(password);

      const newUser = new UserModel({
        id: randomUUID(),
        name,
        email,
        brandId: brandInfo.id,
        password: encryptedPassword,
      });
      await newUser.save();

      return reply.send("OK");
    }
  );

  // app.get<{ Params: { token: string } }>(
  //   "/auth/verify/email/:token",
  //   {
  //     schema: {
  //       params: {
  //         token: { type: "string" },
  //       },
  //     },
  //   },
  //   async function (req, reply) {
  //     const now = new Date();
  //     const { token } = req.params;

  //     const verificationRequest = await queryAccountVerification(this.Mongo, {
  //       token,
  //       type: "EMAIL",
  //       active: true,
  //     });

  //     if (!verificationRequest || now > verificationRequest.expireAt) {
  //       throw new BadRequest(
  //         "Account verification request invalid or is expired!"
  //       );
  //     }

  //     // mark email verified
  //     await updateUser(
  //       this.Mongo,
  //       { _id: verificationRequest.userId },
  //       { isEmailVerified: true }
  //     );

  //     await closeAccountVerification(this.Mongo, {
  //       _id: verificationRequest._id,
  //     });

  //     return reply.send("OK");
  //   }
  // );
};

export default routes;
