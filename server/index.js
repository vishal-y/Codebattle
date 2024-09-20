const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./Models/RegisterUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();


// Initializing
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: '*' ,
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(cors())
app.options('*', cors());



const userSocketMap = {};
const user_code = {};
let admin = "";
let global_roomId = "";
let isShared = false;
let shared_user = "";
let shared_user_socketId = "";
let ready_player = [];
let clients_id = new Set();

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {

  console.log("socket id:", socket.id);

  socket.on("join", ({ roomId, username }) => {
    
    if(admin==""){
      admin = username;
      console.log(admin , "is the admin")
    }
    else{
      console.log("admin already exist : " , admin)
    }

    userSocketMap[socket.id] = username;
    global_roomId = roomId;
    console.log("socket id of : ", username);
    console.log("socket id of : ", socket.id);
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        admin , 
        clients,
        username,
        // socketId: socket.id,
      });
  
      clients_id.add(socketId);

    });
  });

  socket.on("codechange", ({ user, roomId, e }) => {
    user_code[user] = e;
    io.to(roomId).emit("codechange", {
      e,
    });

    if(isShared){
      shareCode(shared_user , shared_user_socketId);
    }

  });

  socket.on("share-code", ({ whoscode, clientUsername }) => {
    
    shared_user = whoscode;

    isShared = true;
    let socketId = "";
    Object.entries(userSocketMap).forEach(([id, username]) => {
      if (username == clientUsername) {
        socketId = id;
        shared_user_socketId = id;
      }
    });

    shareCode(whoscode , socketId);

  });

  const shareCode = (whoscode,socketId)=>{
    let new_code = user_code[whoscode];
    io.to(socketId).emit("send-code", {
      code: new_code,
    });
  }


  console.log("total connected user : " , Object.keys(userSocketMap).length)

  let i = 0;
  socket.on("player-ready",({name})=>{
    console.log("i ka value " , i);
    console.log("object ka value " , Object.keys(userSocketMap).length )
    console.log("ready player ka value " , ready_player.length)
    ready_player.push(i++);
    
    const clients = getAllConnectedClients(global_roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("player-start", {
        name
      });
    });

    if(Object.keys(userSocketMap).length == ready_player.length){
      console.log("start ho gaya")
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("player-start", {
        start : true
      });
    });
    }
    else{
      console.log("abhi sab bande join nahi kiye hai");
    }


  })


  socket.on("message", ({ message, username , submit , time }) => {
    userSocketMap[socket.id] = username;
    clients_id.forEach((id ) => {
      console.log("socket id : " , id)
      console.log("Submit : " , submit)
     try{
      io.to(id).emit("all-message", {
        username,
        message,
        submit ,
        time
      });
     }
     catch(e){
      console.log("something went wrong in message : " , e)
     }
    });
    console.log("message was : " , message)
  });


  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

});





// connection
const uri = process.env.URI;
mongoose.connect(uri).then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`server is running at http:localhost/:${process.env.PORT}`);
    });
  }).catch((e) => {
    console.log(e);
  });

app.get("/",(req,res)=>{
  res.json("HII 👋 from server.")
})

// Routes
app.post("/register", async (req, res) => {
  const { username, email, password, name , about , DP } = req.body;

  try {
    const isUsernameRegistered = await user.findOne({ username });
    const isEmailRegistered = await user.findOne({ email });

    if (isUsernameRegistered) {
      return res.status(401).json({ error: "Username already registered" });
    }

    if (isEmailRegistered) {
      return res.status(401).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ name, username, email, password: hashedPassword , about , DP});
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });

    res.status(201).json({ 
      token,
      user: {
        username: newUser.username,
        name: newUser.name,
        email: newUser.email
      },
      message: "User registered successfully" 
    });

  } catch (e) {
    console.error("Registration error: ", e.message);  // Updated to log only the error message
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/login", async (req, res) => {
  console.log("someone tried to login");
  try {
    const { username, password } = req.body;
    
    // Check if the username exists
    const userRecord = await user.findOne({ username });
    if (!userRecord) {
      return res.status(401).json({ error: "Incorrect username" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, userRecord.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect username" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: userRecord._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });

    // Return the response with user information and token
    res.json({
      token,
      user: {
        username: userRecord.username,
        name:userRecord.name,
        email:userRecord.email
      },
      message: "Login successful",
    });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500).json({ error: "An internal server error occurred" });
  }
});


app.post("/updateUser", async (req, res) => {
  try {
    const { username, name, email, about , DP } = req.body;
    // Check if username exists
    const userToUpdate = await user.findOne({ username });
    if (!userToUpdate) {
      return res.status(401).json({ error: "Username not found" });
    }
    // Update user details
    if (name !== undefined) userToUpdate.name = name;
    if (email !== undefined) userToUpdate.email = email;
    if (about !== undefined) userToUpdate.about = about;
    if (DP !== undefined) userToUpdate.DP = DP;

    // Save the updated user
    await userToUpdate.save();

    // Generate a new token
    const token = jwt.sign({ userId: userToUpdate._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });

    // Respond with the new token and updated user details
    res.json({
      token,
      username: userToUpdate.username,
      name: userToUpdate.name,
      email: userToUpdate.email,
      about: userToUpdate.about,
      dp : userToUpdate.DP,
      message: "User updated successfully",
    });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
});


app.post('/getUser', async (req, res) => {

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {

    const isUser = await user.findOne({ username });

    if (!isUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: isUser.name,
      username: isUser.username,
      email: isUser.email,
      about: isUser.about,
      DP : isUser.DP
    });

  } catch (error) {

    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
    
  }

});