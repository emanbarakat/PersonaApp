function errorHandler(error, req, res, next) {
  console.error("Request failed:", error.message);

  res.status(error.status || 500).json({
    error: error.message || "Internal server error"
  });
}

module.exports = {
  errorHandler
};
