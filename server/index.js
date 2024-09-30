const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const cookieParser = require('cookie-parser');

// Import DB connection
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require('./routes/roomRoutes');

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend URL
  methods: ['POST', 'GET'],
  credentials: true // This allows cookies to be sent
}));

// Use routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use('/rooms', roomRoutes);

// Socket handling
require("./sockets/socketHandler")(io);

// Start the server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
