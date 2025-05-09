import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDB(process.env.MONGO_URI || '');

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/', (_req, res) => {
  res.send('✅ API funcionando correctamente');
});

app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
