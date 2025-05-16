
// import mongoose from 'mongoose';

// const connectDB = async (uri: string): Promise<void> => {
//   try {
//     await mongoose.connect(uri);
//     console.log('Conectado a MongoDB');
//   } catch (error) {
//     console.error('Error al conectar a MongoDB:', error);
//     process.exit(1);
//   }
// };

// export default connectDB;


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dashboard'
});

connection.connect((err: any) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

export default connection;
