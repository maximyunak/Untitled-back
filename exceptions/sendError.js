function sendError(res, error) {
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
    errors: error.errors || [],
  });
}

module.exports = { sendError };
