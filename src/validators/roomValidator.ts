import { z } from 'zod';

export const RoomSchema = z.object({
  room_id: z.number().int().positive(),
  name: z.string().min(1, "El nombre no puede estar vacío"),
  price: z.number().nonnegative()
});

export const RoomArraySchema = z.array(RoomSchema);
