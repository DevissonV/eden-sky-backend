import userService from '../services/user-service.js';
import { successResponse, errorResponse } from '../../../core/utils/response/response.js';

/**
 * Controller for managing user operations.
 * @class UserController
 */
class UserController {
  /**
   * Registers a new user.
   * @param {import("express").Request} req - Express request object containing username, password, and role.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with the registered user data.
   */
  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      const user = await userService.register(username, password, role);
      return successResponse(res, user, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  /**
   * Authenticates a user and returns a token.
   * @param {import("express").Request} req - Express request object containing username and password.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response with authentication token and user role.
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const { token, role } = await userService.login(username, password);
      return successResponse(res, { token, role });
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  }

  /**
   * Deletes a user by username.
   * @param {import("express").Request} req - Express request object containing the username to be deleted.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<void>} Response indicating the deletion of the user.
   */
  async delete(req, res) {
    try {
      const { username } = req.body;
      await userService.deleteByUsername(username);
      return successResponse(res, { message: `User ${username} deleted` });
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }
}

export default new UserController();
