/**
 * Transforms the validated user data into a DTO for creation.
 * @param {Object} data - The validated user data.
 * @returns {Object} The DTO for creating a user.
 */
export const createUserDto = (data) => ({
  username: data.username,
  password: data.password,
  role: data.role,
});

/**
 * (Optional) Transforms the login credentials into a DTO.
 * In this case, the data is returned as is.
 * @param {Object} data - The login credentials.
 * @returns {Object} The DTO for user login.
 */
export const loginUserDto = (data) => ({
  username: data.username,
  password: data.password,
});
