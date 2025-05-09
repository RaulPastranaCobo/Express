// services/roomsService.ts
import RoomModel from '../models/Room';
import { Room } from '../interfaces/roomInterface';

export class RoomService {
  async fetchAll() {
    return await RoomModel.find();
  }

  async fetchOne(id: string) {
    return await RoomModel.findById(id);
  }

  async create(data: Room) {
    const room = new RoomModel(data);
    return await room.save();
  }

  async delete(id: string) {
    return await RoomModel.findByIdAndDelete(id);
  }
}
