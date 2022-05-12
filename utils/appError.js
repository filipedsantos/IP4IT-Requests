class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : error;
    // A error launched by us!
    this.isOperacional = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
