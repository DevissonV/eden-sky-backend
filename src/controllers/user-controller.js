import userService from '../services/user-service.js';
import { successResponse, errorResponse } from '../utils/response/response.js';

class UserController {
  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      const user = await userService.register(username, password, role);
      return successResponse(res, user, 201);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const { token, role } = await userService.login(username, password);
      return successResponse(res, { token, role });
    } catch (error) {
      return errorResponse(res, error.message, 401);
    }
  }

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
