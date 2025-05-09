import { Router } from 'express';
import { login } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hola ${req.user?.name}, esta es una ruta protegida.` });
});

export default router;
