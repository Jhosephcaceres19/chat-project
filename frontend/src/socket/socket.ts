// src/socket.ts
import io from 'socket.io-client';

const socket = io('/'); // La URL del servidor debe coincidir con la del backend
export default socket;
