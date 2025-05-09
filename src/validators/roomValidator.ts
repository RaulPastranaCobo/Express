import { z } from 'zod';

export const RoomSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  capacity: z.number().int().positive(),
});
