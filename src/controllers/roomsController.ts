import { Request, Response } from 'express';
import { RoomSchema } from '../validators/roomValidator';
import { RoomService } from '../services/roomsService';


const service = new RoomService();

export const getAllRooms = (req: Request, res: Response) => {
  const rooms = service.fetchAll();
  res.json(rooms);
};

export const getRoomById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const room = service.fetchOne(id);
  room ? res.json(room) : res.status(404).json({ error: 'Room not found' });
};

export const createNewRoom = (req: Request, res: Response) => {
  const result = RoomSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.format() });

  const created = service.create(result.data);
  res.status(201).json(created);
};

export const updateRoomById = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const result = RoomSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  const updated = service.update(id, result.data);

  if (!updated) {
    return res.status(404).json({ error: 'Room not found' });
  }

  return res.json(updated);
};

export const deleteRoomById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = service.delete(id);
  deleted ? res.status(204).send() : res.status(404).json({ error: 'Room not found' });
};
