// index.js
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: '/',
});

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>');
});

const users = {}; // Para llevar un registro de los usuarios conectados

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Asignar nombre de usuario
  socket.on('setUsername', (nickname) => {
    if (!users[nickname]) {
      users[nickname] = socket.id;
      socket.username = nickname;
      console.log(`Socket ID ${socket.id} is now known as ${nickname}`);
      socket.emit('userSet', { username: nickname });
      console.log("Usuario registrado:", nickname);
    } else {
      console.log(`Username ${nickname} is already taken.`);
      socket.emit('error', { message: 'Username is already taken' });
    }
  });

  // Manejar mensajes
  socket.on('message', (body) => {
    const message = {
      body,
      from: socket.username || socket.id.slice(6),
    };
    console.log(socket.id, 'Mensaje enviado:', message);
    io.emit('message', message);
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    if (socket.username) {
      delete users[socket.username]; // Eliminar al usuario del registro al desconectar
    }
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server connected on port 3000');
});
