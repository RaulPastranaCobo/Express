// import RoomModel from '../models/Room';
// import { Room } from '../interfaces/roomInterface';

// export class RoomService {
//   async fetchAll() {
//     return await RoomModel.find();
//   }

//   async fetchOne(id: string) {
//     return await RoomModel.findById(id);
//   }

//   async create(data: Room) {
//     const room = new RoomModel(data);
//     return await room.save();
//   }

//   async delete(id: string) {
//     return await RoomModel.findByIdAndDelete(id);
//   }
// }


import connection from '../db';



class RoomService {
  fetchAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rooms', (err: any, results: unknown) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  fetchOne(roomId: any) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rooms WHERE roomId = ?', [roomId], (err: any, results: any[]) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  }

  create(data: { roomId: any; room_number: any; room_type: any; price: any; discount:any;}) {
    const { roomId, room_number, room_type, price, discount } = data;
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO rooms (roomId, room_number, room_type, price, discount) VALUES (?, ?, ?, ?, ?)',
        [roomId, room_number, room_type, price, discount],
        (err: any, result: { insertId: any; }) => {
          if (err) return reject(err);
          this.fetchOne(result.insertId)
            .then(room => resolve(room))
            .catch(err => reject(err));
        }
      );
    });
  }

  delete(roomId: any) {
    return new Promise<void>((resolve, reject) => {
      connection.query('DELETE FROM rooms WHERE roomId = ?', [roomId], (err: any, result: any) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = RoomService;

