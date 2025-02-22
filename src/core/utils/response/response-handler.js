export const responseHandler = {
  /**
   * Sends a success response.
   * @param {import("express").Response} res - Express response object.
   * @param {Object|Object[]} data - Data to send in the response.
   * @param {string} [message="Operation successful"] - Success message.
   * @param {number} [code=200] - HTTP status code.
   * @returns {void} Sends the response.
   */
  success: (res, data, message = 'Operation successful', code = 200) => {
    const responseData =
      data && typeof data === 'object' && !Array.isArray(data) && 'data' in data
        ? data
        : { data };

    return res.status(code).json({
      status: true,
      code,
      message,
      ...responseData,
    });
  },

  /**
   * Sends an error response.
   * @param {import("express").Response} res - Express response object.
   * @param {string} message - Error message.
   * @param {number} [code=500] - HTTP status code.
   * @returns {void} Sends the response.
   */
  error: (res, message = 'Something went wrong', code = 500) => {
    return res.status(code).json({
      status: false,
      code,
      message,
    });
  },
};
