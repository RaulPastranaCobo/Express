
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { faker } from '@faker-js/faker';
// import User from './models/User';
// import Room from './models/Room';
// import Booking from './models/Booking';
// import Contact from './models/Contact';


// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI || '';

// const connectDB = async () => {
//   await mongoose.connect(MONGO_URI);
//   console.log('Conectado a MongoDB');
// };

// const seed = async () => {
//   try {
//     await connectDB();

//     await User.deleteMany();
//     await Room.deleteMany();
//     await Booking.deleteMany();
//     await Contact.deleteMany();

//     const users = Array.from({ length: 10 }).map(() => ({
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       role: faker.helpers.arrayElement(['admin', 'guest']),
//     }));
//     await User.insertMany(users);


//     const rooms = Array.from({ length: 10 }).map(() => ({
//       name: faker.word.adjective() + ' Room',
//       price: faker.number.int({ min: 50, max: 300 }),
//       capacity: faker.number.int({ min: 1, max: 5 }),
//     }));
//     await Room.insertMany(rooms);

//     const bookings = Array.from({ length: 10 }).map(() => ({
//       user: faker.helpers.arrayElement(users).name,
//       room: faker.helpers.arrayElement(rooms).name,
//       date: faker.date.future(),
//     }));
//     await Booking.insertMany(bookings);

   
//     const contacts = Array.from({ length: 10 }).map(() => ({
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       message: faker.lorem.sentence(),
//     }));
//     await Contact.insertMany(contacts);

//     console.log('Datos ficticios insertados correctamente');
//     process.exit();
//   } catch (err) {
//     console.error('Error al hacer seed:', err);
//     process.exit(1);
//   }
// };

// seed();

import { faker } from '@faker-js/faker';

export function createRandomRoom() {
  return {
    roomId: faker.string.uuid(),
    room_number: faker.number.int({ min: 100, max: 999 }),
    room_type: faker.helpers.arrayElement(['single', 'double']),
    price: Number(faker.commerce.price({ min: 50, max: 500 })),
    discount: faker.number.int({ min: 0, max: 50 }),
  };
}

export const rooms = faker.helpers.multiple(createRandomRoom, { count: 10 });
