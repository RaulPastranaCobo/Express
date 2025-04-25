import fs from 'fs';
import path from 'path';
import { Room } from '../interfaces/roomInterface';

export class RoomService {
  private roomsPath: string;

  constructor() {
    this.roomsPath = path.resolve(__dirname, '../../rooms.json');
  }

  private readRooms(): Room[] {
    const data = fs.readFileSync(this.roomsPath, 'utf-8');
    return JSON.parse(data);
  }

  private writeRooms(rooms: Room[]) {
    fs.writeFileSync(this.roomsPath, JSON.stringify(rooms, null, 2));
  }

  public fetchAll(): Room[] {
    return this.readRooms();
  }

  public fetchOne(id: number): Room | undefined {
    return this.readRooms().find(room => room.room_id === id);
  }

  public create(room: Room): Room {
    const rooms = this.readRooms();
    rooms.push(room);
    this.writeRooms(rooms);
    return room;
  }

  public update(id: number, updatedRoom: Room): Room | undefined {
    const rooms = this.readRooms();
    const index = rooms.findIndex(r => r.room_id === id);
    if (index === -1) return undefined;
    rooms[index] = updatedRoom;
    this.writeRooms(rooms);
    return updatedRoom;
  }

  public delete(id: number): boolean {
    let rooms = this.readRooms();
    const originalLength = rooms.length;
    rooms = rooms.filter(r => r.room_id !== id);
    this.writeRooms(rooms);
    return rooms.length < originalLength;
  }
}
