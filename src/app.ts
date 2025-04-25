import express from 'express';
import roomsRouter from './routes/roomsRoutes';

const app = express();


app.use(express.json());


app.use('/api/rooms', roomsRouter); 


app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
