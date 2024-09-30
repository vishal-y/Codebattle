const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for Room
const roomSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming the User model is named 'User'
    required: true,
  },
  roomID: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String, // Adjust the type according to your needs (e.g., 'easy', 'medium', 'hard')
    required: true,
  },
  timePerQuestion: {
    type: Number, // Assuming this is a number representing seconds or time limit
    required: true,
  },
  totalQuestion: {
    type: Number, // Assuming this is a number representing seconds or time limit
    required: true,
  },
}, { timestamps: true });

// Create the Room model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
