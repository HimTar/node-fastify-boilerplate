import bcrypt from "bcryptjs";
import exp from "constants";
import * as jwt from "jsonwebtoken";

export interface EncryptService {
  encrypt: (text: string) => Promise<string>;
  compareData: (text: string, hashedData: string) => Promise<boolean>;
  encryptToken: (data: Record<string, string>) => Promise<string>;
  decryptToken: (token: string) => Promise<Record<string, string>>;
}

export const generateEncryptService = (salt: string) => {
  return {
    encrypt: async (text: string) => {
      const hashedData = await bcrypt.hash(text, salt);
      return hashedData;
    },
    compareData: async (text: string, hashedData: string) => {
      const isMatch = await bcrypt.compare(text, hashedData);
      return isMatch;
    },
    encryptToken: async (data: Record<string, string>) => {
      const jwtToken = jwt.sign(
        {
          data,
          // Three days expiry token
          exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 3,
        },
        salt
      );
      return jwtToken;
    },
    decryptToken: async (token: string) => {
      const data = jwt.verify(token, salt);
      return JSON.parse(JSON.stringify(data));
    },
  };
};
