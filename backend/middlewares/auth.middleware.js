import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../config.js';
import { User } from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies['jwt-products'];

    if(!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.user_id).select('-password');

    if(!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectedRoute middleware: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}