/**
 * Sends a success response.
 * @param {import("express").Response} res - Express response object.
 * @param {Object} data - Data to send in the response.
 * @param {number} [code=200] - HTTP status code.
 * @param {boolean} [paginated=false] - Whether the response is paginated.
 * @returns {void} Sends the response.
 */
export const successResponse = (res, data, code = 200, paginated = false) => {
  return res.status(code).json({
    status: true,
    code,
    ...(paginated ? data : { data }),
  });
};

/**
 * Sends an error response.
 * @param {import("express").Response} res - Express response object.
 * @param {string} message - Error message.
 * @param {number} [code=500] - HTTP status code.
 * @returns {void} Sends the response.
 */
export const errorResponse = (res, message, code = 500) => {
  return res.status(code).json({
    status: false,
    code,
    message,
  });
};
