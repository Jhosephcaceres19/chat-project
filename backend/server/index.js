import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)
app.get('/', (req, res) => {
  res.send('<h1>hola mundo</h1>')
})

io.on('connection', socket => {
  console.log('user conected');
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('server conected in port:', 3000)
})
