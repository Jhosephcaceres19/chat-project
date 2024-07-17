import { io } from "socket.io-client"

const socket = io('/')

export const Chat = () => {
  return (
    <div>
      <div>Chat</div>
      <div>
        <form action="">
          <input type="text" />
        </form>
      </div>
    </div>
  )
}
