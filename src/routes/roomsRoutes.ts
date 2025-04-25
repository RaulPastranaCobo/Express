import express from 'express';
import {
  getAllRooms,
  getRoomById,
  createNewRoom,
  updateRoomById,
  deleteRoomById
} from '../controllers/roomsController';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', createNewRoom);
router.put('/:id', updateRoomById);
router.delete('/:id', deleteRoomById);

export default router;