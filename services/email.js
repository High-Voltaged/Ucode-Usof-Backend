const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");
const templates = require("~/emails");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class EmailService {
  static async sendMail(email, subject, data = {}) {
    const template = templates[subject];

    const html = pug.renderFile(`${path.resolve("emails", template.name)}`, data);

    await transporter.sendMail({
      from: `Ucode QA Platform`,
      to: email,
      subject: template.subject,
      html,
    });
  }
}

module.exports = EmailService;
