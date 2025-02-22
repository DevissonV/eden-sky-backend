import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user-repository.js';
import { envs } from '../../../core/config/envs.js';

/**
 * Service class for managing user-related operations.
 * @class UserService
 */
class UserService {
  /**
   * Registers a new user.
   * @param {string} username - The username for the new user.
   * @param {string} password - The password for the new user.
   * @param {string} role - The role assigned to the user.
   * @returns {Promise<Object>} The created user data.
   * @throws {Error} If the username already exists.
   */
  async register(username, password, role) {
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, role };
    return userRepository.create(newUser);
  }

  /**
   * Logs in a user and generates an authentication token.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<{token: string, role: string}>} Authentication token and user role.
   * @throws {Error} If the username or password is invalid.
   */
  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      envs.JWT_SECRET,
      { expiresIn: envs.JWT_TIME_EXPIRES },
    );
    return { token, role: user.role };
  }

  /**
   * Deletes a user by username.
   * @param {string} username - The username of the user to delete.
   * @returns {Promise<void>} Resolves when the user is deleted.
   * @throws {Error} If the user is not found.
   */
  async deleteByUsername(username) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    await userRepository.deleteByUsername(username);
  }
}

export default new UserService();
