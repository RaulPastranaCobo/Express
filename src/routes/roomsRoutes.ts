import express from 'express';
import {  createNewRoom, deleteRoom, getAllRooms, getRoomById } from '../controllers/roomController';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', createNewRoom);
router.delete('/:id', deleteRoom);

export default router;
