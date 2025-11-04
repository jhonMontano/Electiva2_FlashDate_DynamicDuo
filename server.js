require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./src/infrastructure/http/routes/UserRoutes");
const authRoutes = require("./src/infrastructure/http/routes/AuthRoutes");
const messageRoutes = require("./src/infrastructure/http/routes/MessageRoutes");
const swaggerSpec = require("./src/infrastructure/config/swagger");
const connectBD = require("./src/infrastructure/config/db");

const MessageRepository = require("./src/infrastructure/persistence/MessageRepository");
const MessageService = require("./src/application/services/MessageService");

connectBD();

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const swipeRoutes = require("./src/infrastructure/http/routes/SwipeRoutes")(io);
app.use("/api/swipes", swipeRoutes);

app.use("/api/messages", messageRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
  res.send("Welcome to API from FlashDate 🚀");
});

const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);

  socket.on("JoinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`📥 User ${socket.id} joined room ${roomId}`);
  });

  socket.on('privateMessage', (messageData) => {
    socket.to(messageData.roomId).emit('privateMessage', messageData);
  });

  socket.on('userOnline', ({ userId }) => {
    socket.userId = userId;
    console.log(`Usuario ${userId} está online`);
  });

  socket.on("register", (userId) => {
    socket.join(userId);
    console.log(`🧠 Usuario ${userId} registrado en su sala personal`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected: ", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server + Socket.IO running on: http://0.0.0.0:${PORT}`);
});