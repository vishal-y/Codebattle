const Room = require('../Models/roomModel');
const mongoose = require('mongoose');


// Create a new room
const createRoom = async (req, res) => {
  const { owner, ownerID, roomID, difficulty, timePerQuestion , totalQuestion} = req.body;

  console.log("SOMEONE TRIED TO CREATE A ROOM :) ")

  // Validate the request body
  if (!owner || !ownerID || !roomID || !timePerQuestion || !totalQuestion) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if the roomID is already taken
    const existingRoom = await Room.findOne({ roomID });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room ID already exists.' });
    }

    // const existingRoomOwner = await Room.findOne({ owner });
    // if (existingRoomOwner) {
    //   return res.status(400).json({ error: 'A room already exist' });
    // }

    // Create the new room
    const newRoom = new Room({
      owner,
      ownerID: new mongoose.Types.ObjectId(ownerID), // Correct way to create ObjectId
      roomID,
      difficulty,
      timePerQuestion,
      totalQuestion
    });

    await newRoom.save();

    res.status(201).json({ message: 'Room created successfully.', room: newRoom });
  } catch (error) {
    console.error('Error creating room:', error.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// Get room details by roomID
const getRoomById = async (req, res) => {
    const { roomID } = req.params; // Extract roomID from request params
    try {
      // Ensure you log the exact roomID you are searching for
      const room = await Room.findOne({ roomID: roomID }); // Query correctly
      // Log the found room or lack thereof
      if (!room) {
        return res.status(404).json({ return : true });
      }
      res.status(200).json(room);
    } catch (error) {
      console.error('Error fetching room details:', error.message);
      res.status(500).json({ error: 'Server error. Please try again.' });
    }
};
  
// Delete a room by roomID
const deleteRoom = async (req, res) => {
  const { roomID } = req.params;

  try {
    const deletedRoom = await Room.findOneAndDelete({ roomID });
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    res.status(200).json({ message: 'Room deleted successfully.' });
  } catch (error) {
    console.error('Error deleting room:', error.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

module.exports = {
  createRoom,
  getRoomById,
  deleteRoom,
};
