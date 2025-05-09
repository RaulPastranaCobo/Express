import { z } from 'zod';

export const BookingSchema = z.object({
  user: z.string().min(1),
  room: z.string().min(1),
  date: z.coerce.date(),
});
