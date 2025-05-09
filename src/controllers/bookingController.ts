import { Request, Response } from 'express';
import { BookingSchema } from '../validators/bookingValidator';
import Booking from '../models/Booking';

export const getAllBookings = async (_req: Request, res: Response) => {
  const bookings = await Booking.find().populate('user room');
  res.json(bookings);
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user room');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const parsed = BookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const newBooking = new Booking(parsed.data);
  const saved = await newBooking.save();
  res.status(201).json(saved);
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Booking not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
