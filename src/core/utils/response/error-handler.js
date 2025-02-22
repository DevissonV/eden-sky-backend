/**
 * Custom error class for handling application errors.
 * @class AppError
 * @extends {Error}
 */
export class AppError extends Error {
    /**
     * Creates an instance of AppError.
     * @param {string} message - Error message.
     * @param {number} statusCode - HTTP status code (default is 500).
     */
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  