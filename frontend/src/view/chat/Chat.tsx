// src/view/home/Chat.tsx
import { useState, useEffect } from "react";
import socket from '../../socket/socket'; // Importa la conexión centralizada

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const username = localStorage.getItem("username");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: username || "Me",
    };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message: any) => {
      console.log("mensaje recibido", message);
      setMessages((state) => [...state, message]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-sky-800 to-sky-700 text-white grid grid-cols-3 justify-center h-screen">
      <div className="hidden md:flex">Chat</div>
      <div className="col-span-3 md:col-span-2 border-solid border-2 border-black bg-slate-300 rounded-xl m-10 flex flex-col justify-between">
        <div className="p-4 h-auto">
          <div className="text-white">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`my-2 p-2 table text-sm rounded-md ${
                  message.from === username
                    ? "bg-sky-700 ml-auto"
                    : "bg-sky-950"
                }`}
              >
                {message.from}: {message.body}
              </li>
            ))}
          </div>
        </div>
        <div className="mr-4 h-14 flex items-center justify-end">
          <form onSubmit={handleSubmit} className="flex flex-row gap-3">
            <input
              type="text"
              placeholder="Write your message:"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-2 border-solid pl-1 border-sky-950 w-auto text-black rounded-lg"
            />
            <button
              type="submit"
              className="border-solid border-2 border-black bg-blue-700 rounded-lg p-2 hover:bg-green-500"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
