import jwt from 'jsonwebtoken';
import { envs } from "../config/envs.js";


export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: false, code: 401, error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, code: 401, error: 'Invalid token.' });
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ status: false, code: 403, error: 'Access forbidden. Insufficient permissions.' });
  }
  next();
};
