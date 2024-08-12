import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const port = 3002;

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173/", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(cors());

// Crea una función que maneja las solicitudes del servidor
app.get("/", (req, res) => {
  res.status(200).send("puerto 3002\n");
});

// Crea el servidor HTTP
const server = http.createServer(app);

// Instancia de Socket.IO
const io = new Server(server);

// Almacenar datos de usuarios
const users = {};
const userDetails = [];

// Configurar eventos de Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Enviar la lista de usuarios a un nuevo cliente al conectarse
  socket.emit("userList", userDetails);

  // Registrar usuario
  socket.on("register", (data) => {
    console.log("Datos recibidos en el servidor:", data);
    const { nickname, phone, image } = data;
    if (!users[nickname]) {
      users[nickname] = socket.id;
      userDetails.push({
        id: socket.id,
        nickname,
        phone,
        image,
      });
      console.log("Usuarios actuales:", users);
      console.log("Detalles de usuarios:", userDetails);
      socket.username = nickname;
      socket.emit("userSet", { username: nickname });

      // Emitir la lista actualizada a todos los clientes
      io.emit("userList", userDetails);
    } else {
      console.log(`Username ${nickname} is already taken.`);
      socket.emit("error", { message: "Username is already taken" });
    }
    console.log(users);
    console.log(userDetails);
  });

  socket.on("getUsers", () => {
    socket.emit("userList", userDetails);
  });

  socket.on("message", (message) => {
    const messageObj = {
      body: message.body || message,
      from: socket.username || socket.id.slice(6),
    };
    console.log("Mensaje enviado:", messageObj);
    io.emit("message", messageObj);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      delete users[socket.username];
      const index = userDetails.findIndex((user) => user.id === socket.id);
      if (index !== -1) {
        userDetails.splice(index, 1);
      }
      // Emitir la lista actualizada a todos los clientes
      io.emit("userList", userDetails);
    }
    console.log("User disconnected:", socket.id);
  });
});

// Configura el servidor para que escuche en el puerto especificado
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
