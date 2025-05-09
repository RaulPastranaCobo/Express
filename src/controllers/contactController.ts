import { Request, Response } from 'express';
import { ContactSchema } from '../validators/contactValidator';
import Contact from '../models/Contact';

export const getAllContacts = async (_req: Request, res: Response) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

export const createContact = async (req: Request, res: Response) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const newContact = new Contact(parsed.data);
  const saved = await newContact.save();
  res.status(201).json(saved);
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
