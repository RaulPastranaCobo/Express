import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import userRoutes from './routes/userRoutes.js';
import type { Connection } from 'mysql2/promise';
import { rooms } from './seed.js';

declare global {
  namespace Express {
    interface Request {
      db: Connection;
    }
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'dashboard',
};

let db: mysql.Connection;

async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Conectado a MySQL');
    
    app.use((req, res, next) => {
      req.db = db;
      next();
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error al conectar a MySQL:', err.message);
    } else {
      console.error('Error al conectar a MySQL:', err);
    }
    process.exit(1);
    
  }
  await seedRooms();
}

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/', (_req, res) => {
  res.send('API funcionando correctamente con MySQL');
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
  });
});



async function seedRooms() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        roomId VARCHAR(36) NOT NULL,
        room_number INT NOT NULL,
        room_type VARCHAR(50),
        price DECIMAL(10,2),
        discount INT
      );
    `);

    await db.query('DELETE FROM rooms');

    const insertRoom = `
      INSERT INTO rooms (roomId, room_number, room_type, price, discount)
      VALUES (?, ?, ?, ?, ?)
    `;

    for (const room of rooms) {
      await db.query(insertRoom, [
        room.roomId,
        room.room_number,
        room.room_type,
        room.price,
        room.discount,
      ]);
    }

    console.log('Rooms insertadas en la base de datos');
  } catch (err) {
    console.error('Error insertando rooms:', err);
  }
}
