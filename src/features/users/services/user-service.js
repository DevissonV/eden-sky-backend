import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { envs } from '#core/config/envs.js';
import { AppError } from '#core/utils/response/error-handler.js';
import { getLogger } from '#core/utils/logger/logger.js';
import userRepository from '../repositories/user-repository.js';
import { validateUser } from '../validations/user-validation.js';
import { createUserDto, loginUserDto } from '../dto/user-dto.js';

/**
 * Service class for managing user-related business logic.
 * @class UserService
 */
class UserService {
  /**
   * Registers a new user.
   * @param {Object} data - User registration data.
   * @returns {Promise<Object>} The created user.
   */
  async register(data) {
    try {
      const validatedData = validateUser(data);

      const existingUser = await userRepository.findByUsername(
        validatedData.username,
      );

      if (existingUser) {
        throw new AppError('Username already exists', 400);
      }

      validatedData.password = await bcrypt.hash(validatedData.password, 10);

      const dto = createUserDto(validatedData);

      return await userRepository.create(dto);
    } catch (error) {
      getLogger().error(`Error register user: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while creating user',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Logs in a user and generates a token.
   * @param {Object} credentials - User login credentials.
   * @returns {Promise<{token: string, role: string}>} Authentication token and role.
   */
  async login(credentials) {
    try {
      const dto = loginUserDto(credentials);
      const user = await userRepository.findByUsername(dto.username);
      if (!user || !(await bcrypt.compare(dto.password, user.password))) {
        throw new AppError('Invalid username or password', 401);
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        envs.JWT_SECRET,
        { expiresIn: envs.JWT_TIME_EXPIRES },
      );
      return { token, role: user.role };
    } catch (error) {
      getLogger().error(`Error login user: ${error.message}`);
      throw new AppError(
        error.message || 'Database error during login',
        error.statusCode || 500,
      );
    }
  }

  /**
   * Deletes a user by username.
   * @param {string} username - Username of the user to delete.
   * @returns {Promise<void>} Resolves when the deletion is complete.
   */
  async deleteByUsername(username) {
    try {
      const user = await userRepository.findByUsername(username);
      if (!user) {
        throw new AppError(`User ${username} not found`, 404);
      }
      await userRepository.deleteByUsername(username);
    } catch (error) {
      getLogger().error(`Error delete user: ${error.message}`);
      throw new AppError(
        error.message || 'Database error while deleting user',
        error.statusCode || 500,
      );
    }
  }
}

export default new UserService();
