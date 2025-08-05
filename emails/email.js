import nodemailer from "nodemailer";

import pug from "pug";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const sendEmail = async (options) => {
  //console.log(options);
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    service: "Brevo",
    auth: {
      user: process.env.BREVO_USERNAME,
      pass: process.env.BREVO_PASSWORD,
    },
  });
  //2 Define the email options
  const html = pug.renderFile(`${__dirname}/welcomeEmail.pug`, {
    email: options.email,
    verificationCode: options.verificationCode,
  });
  const mailOptions = {
    from: "Rami sultana <rami.sultana@gmail.com>",
    to: options.email,
    subject: options.subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
//sendWelcomeEmail(
//   req.body.email,
//   verificationCode,
//   req.body.phoneNumber,
//   req.body.cart
// );
export const sendWelcomeEmail = (email, verificationCode) => {
  sendEmail({
    subject: "thanks for using our web ",
    email,
    verificationCode,
  });
};
//options obj is email,subject,message, so if i add url,name the options obj become options{emil,subject,message,name,url}
//the second sendEmail is what determined the look of the object
