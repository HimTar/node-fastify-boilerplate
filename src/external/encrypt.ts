import bcrypt from "bcryptjs";

export interface EncryptService {
  encrypt: (text: string) => Promise<string>;
  compareData: (text: string, hashedData: string) => Promise<boolean>;
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
  };
};
