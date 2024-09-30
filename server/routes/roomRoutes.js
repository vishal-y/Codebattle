const express = require('express');
const { createRoom, getRoomById, deleteRoom } = require('../controllers/roomController');

const router = express.Router();

// Create a new room
router.post('/create', createRoom);

// Get room details by roomID
router.get('/:roomID', getRoomById);

// Delete a room by roomID
router.delete('/:roomID', deleteRoom);

module.exports = router;
