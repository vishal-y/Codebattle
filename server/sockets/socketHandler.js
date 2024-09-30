const Room = require('../Models/roomModel');

// Global variables
const userSocketMap = {}; // Maps socket.id to username
const roomUserMap = {}; // Maps roomId to connected users (unique usernames)
const userCode = {}; // Maps username to code changes
const roomAdminMap = {}; // Maps roomId to the admin username
const readyPlayersMap = {}; // Maps roomId to an array of ready players
const roomDataMap = {}; // Stores room information by roomId
const isStartedMap = {}; // Tracks game start status per room
const maxUsers = 15; // Max number of users allowed per room

// New global variable to store all data about rooms
let allData = []; // This will hold information about each room

/**
 * Initialize socket server and setup event listeners
 * @param {Object} io - socket.io instance
 */
function socketHandler(io) {
  /**
   * Helper function to get all connected clients in a room
   * @param {String} roomId - ID of the room
   * @returns {Array} - Array of connected clients (socketId and username)
   */
  function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    }));
  }

  // Socket.IO connection handler
  io.on('connection', (socket) => {
    // Handle user joining the room
    socket.on('join', async ({ roomId, username }) => {
      try {
        console.log('New socket connected:', socket.id);
        console.log('ROOM ID:', roomId);

        if (!roomId || !username) {
          socket.emit('join-error', { error: 'Invalid room or username' });
          return;
        }

        // If the username is already connected, disconnect the old socket
        const existingSocketId = Object.keys(userSocketMap).find(
          (key) => userSocketMap[key] === username
        );
        if (existingSocketId) {
          io.sockets.sockets.get(existingSocketId)?.disconnect(true);
          delete userSocketMap[existingSocketId];
        }

        // Check if max user limit is reached for the room
        if (roomUserMap[roomId] && roomUserMap[roomId].length >= maxUsers) {
          socket.emit('join-error', { error: 'Max user limit reached' });
          return;
        }

        // Fetch room info from MongoDB if not already cached
        if (!roomDataMap[roomId]) {
          const room = await Room.findOne({ roomID: roomId });
          if (room) {
            roomDataMap[roomId] = room.toObject();
          } else {
            socket.emit('join-error', { error: 'Room not found' });
            return;
          }
        }

        // Add user to the room, ensuring unique usernames
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        if (!roomUserMap[roomId]) {
          roomUserMap[roomId] = [];
        }

        if (!roomUserMap[roomId].includes(username)) {
          roomUserMap[roomId].push(username);
        }

        const currentRoomData = allData.find(data => data.roomID === roomId);
        if (currentRoomData) {
          if (!currentRoomData.roomPlayer.includes(username)) {
            currentRoomData.roomPlayer.push(username);
          }
        } else {
          allData.push({
            roomID: roomId,
            admin: username,
            roomPlayer: [username],
          });
        }

        console.log('Updated roomUserMap after join:', roomUserMap);
        console.log('Updated allData:', allData);

        // Notify all clients in the room about the new user
        const clients = getAllConnectedClients(roomId);
        io.to(roomId).emit('joined', {
          admin: roomAdminMap[roomId],
          clients,
          username,
          roomInfo: roomDataMap[roomId],
        });
      } catch (error) {
        socket.emit('join-error', { error: 'An unexpected error occurred while joining the room' });
      }
    });

    // Handle code change and share with all clients in the specific room
    socket.on('codechange', ({ user, roomId, e }) => {
      if (!roomId || !user) {
        console.error('Error: roomId or user is undefined in codechange event');
        return;
      }
      userCode[user] = e;
      io.to(roomId).emit('codechange', { e });
    });

    // Handle player ready status
    socket.on('player-ready', ({ name, roomId }) => {
      if (!roomId) {
        return;
      }
      if (!roomDataMap[roomId]) {
        return;
      }

      if (!readyPlayersMap[roomId]) {
        readyPlayersMap[roomId] = [];
      }

      if (!readyPlayersMap[roomId].includes(name)) {
        readyPlayersMap[roomId].push(name);
      }

      const clients = getAllConnectedClients(roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit('player-start', { name });
      });

      if (
        roomUserMap[roomId] &&
        roomUserMap[roomId].length === readyPlayersMap[roomId].length &&
        roomUserMap[roomId].length > 1
      ) {
        isStartedMap[roomId] = true;
        let data = roomDataMap[roomId];
        io.to(roomId).emit('players-start', { start: true, roomInfo: data });
      }
    });

    // Handle message event and broadcast to all clients in the specific room
    socket.on('message', ({ message, username, submit, time, roomId }) => {
      if (!roomId || !username) {
        console.error('Error: roomId or username is undefined in message event');
        return;
      }
      io.to(roomId).emit('all-message', { username, message, submit, time });
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      const username = userSocketMap[socket.id];
      console.log(`${username} is disconnecting.`);
      console.log('Before removal - roomUserMap:', roomUserMap);
      console.log('Before removal - userSocketMap:', userSocketMap);

      // delete userSocketMap[socket.id];

      // for (const roomId in roomUserMap) {
      //   if (roomUserMap[roomId].includes(username)) {
      //     roomUserMap[roomId] = roomUserMap[roomId].filter(user => user !== username);

      //     const currentRoomData = allData.find(data => data.roomID === roomId);
      //     if (currentRoomData) {
      //       currentRoomData.roomPlayer = currentRoomData.roomPlayer.filter(player => player !== username);
      //     }

      //     socket.to(roomId).emit('disconnected', { socketId: socket.id, username });

      //     if (roomUserMap[roomId].length === 0) {
      //       console.log(`No users left in room ${roomId}. Deleting room.`);
      //       try {
      //         const deleteResult = await Room.deleteOne({ roomID: roomId });
      //         console.log(`Room ${roomId} deletion result:`, deleteResult);
      //         if (deleteResult.deletedCount > 0) {
      //           console.log(`Room ${roomId} deleted from database.`);
      //         }
      //       } catch (error) {
      //         console.error(`Error deleting room ${roomId} from database:`, error);
      //       }

      //       delete roomUserMap[roomId];
      //       delete roomDataMap[roomId];
      //       delete readyPlayersMap[roomId];
      //       delete roomAdminMap[roomId];
      //       delete isStartedMap[roomId];
      //       allData = allData.filter(data => data.roomID !== roomId);
      //     }
      //   }
      // }

      console.log('After removal - roomUserMap:', roomUserMap);
      console.log('After removal - userSocketMap:', userSocketMap);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });
  });
}

module.exports = socketHandler;
