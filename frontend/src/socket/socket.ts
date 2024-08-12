import io from 'socket.io-client';

const socket = io('/', {
  transports: ['websocket'],
  cors: {
    origin: 'http://localhost:5173'
  }
});

export default socket;
