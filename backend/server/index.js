import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>');
});

io.on('connection', (socket) => {
  console.log('user connected:', socket.id);

  // Asignar nombre de usuario
  socket.on('setUsername', (nickname) => {
    socket.username = nickname;
    console.log(`Socket ID ${socket.id} is now known as ${nickname}`);
    socket.emit('userSet', { username: nickname });
  });

  // Manejar mensajes
  socket.on('message', (body) => {
    console.log(socket.username, body);
    socket.broadcast.emit('message', {
      body,
      from: socket.username || socket.id.slice(6),
    });
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(3000, () => {
  console.log('server connected on port 3000');
});
