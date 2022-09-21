const emailSubjects = require("~/consts/emails");

const templates = {
  [emailSubjects.EMAIL_CONFIRM]: {
    subject: "Please confirm your email",
    name: "email-confirm.pug",
  },
  [emailSubjects.RESET_PASSWORD]: {
    subject: "Reset your account password",
    name: "reset-password.pug",
  },
};

module.exports = templates;
