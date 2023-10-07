import { env } from "@/lib/env/server";
import nodemailer from "nodemailer";
import Mailgun from "mailgun.js";
// @ts-ignore
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "moha",
  key: env.MAILGUN_API_KEY,
});

// const transporter = nodemailer.createTransport({
//   // host: env.SMTP_HOST,
//   // port: 465,
//   // secure: true,
//   // auth: {
//   //   user: env.SMTP_USER,
//   //   pass: env.SMTP_PASS,
//   // },
//   // from: env.SMTP_FROM,
//   host: "smtp.mailgun.org",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "moha@elguarir.dev",
//     pass: "Bol7ya@#",
//   },
//   from: "Este Center <moha@elguarir.dev>",
// });
// return await transporter.sendMail({
//   to: email,
//   subject,
//   html,
// });

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  const form = new FormData();
  form.append("from", "Este Center <moha@elguarir.dev>");
  form.append("to", to);
  form.append("subject", subject);
  form.append("html", html);

  return await fetch("https://api.mailgun.net/v3/elguarir.dev/messages", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`api:${env.MAILGUN_API_KEY}`),
    },
    body: form,
  });
};
