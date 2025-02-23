import db from '#core/config/database.js';

/**
 * Repository for managing user data in the database.
 * @namespace userRepository
 */
const userRepository = {
  /**
   * Finds a user by their username.
   * @param {string} username - The username of the user to find.
   * @returns {Promise<Object|null>} The user data if found, otherwise null.
   */
  async findByUsername(username) {
    return db('users').where({ username }).first();
  },

  /**
   * Creates a new user.
   * @param {Object} user - The user data to insert.
   * @returns {Promise<Object>} The created user data.
   */
  async create(user) {
    return db('users').insert(user).returning('*');
  },

  /**
   * Deletes a user by their username.
   * @param {string} username - The username of the user to delete.
   * @returns {Promise<number>} The number of rows deleted.
   */
  async deleteByUsername(username) {
    return db('users').where({ username }).del();
  },
};

export default userRepository;
