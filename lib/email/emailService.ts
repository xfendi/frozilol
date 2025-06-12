import nodemailer from "nodemailer";
import { transporter } from "./transporter";

export const sendEmail = async (mailOptions: nodemailer.SendMailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to: ${mailOptions.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${mailOptions.to}:`, error);
  }
};
