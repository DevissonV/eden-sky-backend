import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user-repository.js';
import  { envs } from '../config/envs.js';

class UserService {
  async register(username, password, role) {
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, role };
    return userRepository.create(newUser);
  }

  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      envs.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, role: user.role };
  }

  async deleteByUsername(username) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    await userRepository.deleteByUsername(username);
  }
}

export default new UserService();
