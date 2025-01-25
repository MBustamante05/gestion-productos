import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../config.js';
import { NODE_ENV } from '../../config.js';

export const register = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    if (!(email && password && name)) {
      res.status(400).send('Todos los campos son obligatorios');
    }
    const existingEmail = await User.findOne({email: {$regex: `^${email}$`, $options: 'i'}});

    if (existingEmail) {
      return res.status(409).send('El email ya existe');
    }

    if(password.length < 6) {
      return res.status(400).send('La contraseña debe tener al menos 6 caracteres');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword});
    res.status(201).json("User registered successfully");
  } catch (error) {
    console.log("Error in user registration", error);
    res.status(500).json({error: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!(email && password)) {
      res.status(400).send('Todos los campos son obligatorios');
    }

    const user = await User.findOne({email: {$regex: `^${email}$`, $options: 'i'}});

    if (!user) {
      return res.status(404).send('Usuario no registrado');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Credenciales incorrectas');
    }

    const token = jwt.sign({user_id: user._id, email}, JWT_KEY, {expiresIn: '2d'});
    res.cookie('jwt-products', token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    })

    res.status(200).json("Logged in successfully");

  } catch (error) {
    console.log("Error in user login", error);
    res.status(500).json({error: error.message});
  }
}

export const logout = async (req, res) => {
  res.clearCookie('jwt-products');
  res.status(200).json("Logged out successfully");
}

export const getUser = async (req, res) => {
  try {
    res.json({message: "Success!", user: req.user});
  } catch (error) {
    console.log("Error in getUser");
    res.status(500).json("Server error");
  }
}