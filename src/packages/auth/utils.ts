export const generateEmailVerificationMail = (
  username: string,
  token: string
) => {
  const link = `https://localhost:4000/auth/verify/email/${token}`;

  return `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #ddd;">
        <tr>
            <td>
                <h1 style="color: #333;">Email Verification Required</h1>
                <p style="font-size: 16px;">Dear ${username},</p>
                <p style="font-size: 16px;">I hope this email finds you well. We value your trust and are committed to ensuring the security of your account.</p>
                <p style="font-size: 16px;">To complete the registration process and verify your email address, please follow the steps below:</p>
                <ol style="font-size: 16px;">
                    <li>Click on the following link to verify your email:</li>
                </ol>
                <p style="font-size: 16px;"><a href="${link}" style="color: #007BFF;">Verify Your Email</a></p>
                <ol start="2" style="font-size: 16px;">
                    <li>If the above link does not work, you can copy and paste the following URL into your browser:</li>
                </ol>
                <p style="font-size: 16px;">${link}</p>
                <ol start="3" style="font-size: 16px;">
                    <li>If you did not create an account, please disregard this email. Your security is our top priority.</li>
                </ol>
                <p style="font-size: 16px;">Thank you for choosing us. We look forward to serving you.</p>
                <p style="font-size: 16px;">Best regards,</p>
            </td>
        </tr>
    </table>

</body>`;
};
