require("dotenv").config();
const express = require("express");
const http = require("http"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./src/infrastructure/http/routes/UserRoutes");
const authRoutes = require("./src/infrastructure/http/routes/AuthRoutes");
const swipeRoutes = require("./src/infrastructure/http/routes/SwipeRoutes");
const messageRoutes = require("./src/infrastructure/http/routes/MessageRoutes")
const swaggerSpec = require("./src/infrastructure/config/swagger");

const connectBD = require("./src/infrastructure/config/db");
connectBD();

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/swipes", swipeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Welcome to API from FlashDate 🚀");
  });  

io.on("connection", (socket) => {
  console.log("New user connected", socket.io);

  socket.on("JoinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`📥 User ${socket.id} join to room ${roomId}`)
  });

  socket.on("SendMessage", ({roomId, sender, content }) => {
    console.log(`💬 Message from ${sender} in room ${roomId}: ${content}`);
    io.to(roomId).emit("receiveMessage", {sender, content});
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected: ", socket.id)
  });
});  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port: http://localhost:${PORT}`);
});