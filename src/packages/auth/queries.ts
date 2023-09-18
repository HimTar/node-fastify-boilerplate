import { Db, WithId } from "mongodb";
import { User, Session, AccountVerification, UserUpdate } from "./interface";

const userCollection = "user";
const sessionCollection = "session";
const accountVerificationCollection = "account-verification";

type UserIdentifier = {
  [K in keyof WithId<User>]?: any;
};

type SessionIdentifier = {
  [K in keyof WithId<Session>]?: any;
};

type AccountVerificationIdentifier = {
  [K in keyof WithId<AccountVerification>]?: any;
};

// Users
export const queryUser = async (db: Db, identifier: UserIdentifier) => {
  return await db.collection<User>(userCollection).findOne(identifier);
};

export const createUser = async (db: Db, user: User) => {
  return await db.collection<User>(userCollection).insertOne(user);
};

export const updateUser = async (
  db: Db,
  identifier: UserIdentifier,
  update: UserUpdate
) => {
  return await db
    .collection<User>(userCollection)
    .updateOne(identifier, { $set: { ...update, updatedAt: new Date() } });
};

// Sessions
export const querySession = async (db: Db, identifier: SessionIdentifier) => {
  return await db.collection<Session>(sessionCollection).findOne(identifier);
};

export const createSession = async (db: Db, session: Session) => {
  return await db.collection<Session>(sessionCollection).insertOne(session);
};

export const closeSession = async (db: Db, identifier: SessionIdentifier) => {
  return await db
    .collection<Session>(sessionCollection)
    .findOneAndUpdate(identifier, { $set: { active: false } });
};

// Account Verification

// Sessions
export const queryAccountVerification = async (
  db: Db,
  identifier: AccountVerificationIdentifier
) => {
  return await db
    .collection<AccountVerification>(accountVerificationCollection)
    .findOne(identifier);
};

export const createAccountVerification = async (
  db: Db,
  accountVerification: AccountVerification
) => {
  return await db
    .collection<AccountVerification>(accountVerificationCollection)
    .insertOne(accountVerification);
};

export const closeAccountVerification = async (
  db: Db,
  identifier: AccountVerificationIdentifier
) => {
  return await db
    .collection<AccountVerification>(accountVerificationCollection)
    .updateOne(identifier, { $set: { active: false } });
};
