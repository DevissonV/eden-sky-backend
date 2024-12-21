import db from '../config/database.js';

const userRepository = {
  async findByUsername(username) {
    return db('users').where({ username }).first();
  },

  async create(user) {
    return db('users').insert(user).returning('*');
  },

  async deleteByUsername(username) {
    return db('users').where({ username }).del();
  },
};

export default userRepository;
