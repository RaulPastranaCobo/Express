import { UserSchema } from '../validators/userValidator';
import User from '../models/User';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { hardcodedUser } from '../user';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

export const login = async (req: Request<{}, {}, { username: string; password: string }>, res: Response) => {
  const { username, password } = req.body;

  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Credenciales inválidas' });
};


export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const parsed = UserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const newUser = new User(parsed.data);
  const saved = await newUser.save();
  res.status(201).json(saved);
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
