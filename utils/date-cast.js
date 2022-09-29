const dateCast = (field, next) => {
  switch (field.type) {
    case "DATETIME":
      const d = new Date(field.string());
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    default:
      return next();
  }
};

module.exports = dateCast;
