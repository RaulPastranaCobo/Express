import { Request, Response } from 'express';
import { RoomSchema } from '../validators/roomValidator';
import Room from '../models/Room';
import { RoomService } from '../services/roomsService';

const service = new RoomService();


export const getAllRooms = async (_req: Request, res: Response) => {
  const rooms = await Room.find();
  res.json(rooms);
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const createNewRoom = async (req: Request, res: Response): Promise<Response> => {
  const result = RoomSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  try {
    const created = await service.create(result.data);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating room' });
  }
};


export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Room not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
