import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface EmailService {
  sendEmail: (email: {
    to: string;
    subject: string;
    html: string;
  }) => Promise<SMTPTransport.SentMessageInfo>;
}

export const generateEmailService = (
  user: string,
  pass: string
): EmailService => {
  // Create a transporter with your email service configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return {
    sendEmail: async (email: { to: string; subject: string; html: string }) => {
      const nodemailerEmailBody = {
        ...email,
        from: user,
      };

      return await transporter.sendMail(nodemailerEmailBody);
    },
  };
};
