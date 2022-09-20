const errorMiddleware = (error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "A server-side error occurred.",
  });
};

module.exports = errorMiddleware;
