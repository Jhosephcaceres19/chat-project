import { useState, useEffect } from "react";
import socket from "../../socket/socket"; // Importa la conexión centralizada

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const username = localStorage.getItem("username");
  const number = localStorage.getItem("number");
  const image = localStorage.getItem("image");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return; // No enviar mensajes vacíos

    const newMessage = {
      body: message,
      from: username || "Me",
    };

    // Emitir el mensaje al servidor
    socket.emit("message", newMessage);
    setMessage(""); // Limpiar el campo de mensaje
  };

  useEffect(() => {
    const receiveMessage = (message: { body: string; from: string }) => {
      console.log("mensaje recibido", message);
      setMessages((prevMessages) => {
        // Evitar agregar mensajes duplicados
        if (
          prevMessages.find(
            (msg) => msg.body === message.body && msg.from === message.from
          )
        ) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b text-black grid grid-cols-3 justify-center h-screen">
      <div className="flex justify-center w-screen h-screen">
        <div className="flex flex-col col-span-3 border-solid w-[350px] h-screen justify-between border-black ">
          <div className=" text-white  h-24 flex items-center justify-between">
            <div className="bg-slate-300 p-2 rounded-md">
              <input
                type="text"
                placeholder="Buscar"
                className="p-2 rounded-lg text-black"
              />
            </div>
            <div className="bg-slate-300 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-10 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col rounded-md gap-2">
            USUARIOS
          </div>
          <div className=" text-white  h-24 flex items-end justify-between">
            <div className="bg-slate-300 p-2 rounded-md">
              <input
                type="text"
                placeholder="Buscar"
                className="p-2 rounded-lg text-black"
              />
            </div>
            <div className="bg-slate-300 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-10 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:col-span-3 col-span-1 border-solid border-2 border-black bg-slate-300 rounded-xl m-10 flex-col justify-between">
        <div className=" h-auto">
          <ul className="text-white">
            {messages.map((msg, i) => (
              <li
                key={i}
                className={`my-2 p-2 table text-md rounded-md ${
                  msg.from === username ? "bg-sky-600 ml-auto" : "bg-sky-950"
                }`}
              >
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={image || "image"}
                    alt={username || "username"}
                    className="w-10 h-auto rounded-full"
                  />
                  {msg.from}: <p className="text-xl">{String(msg.body)}</p>
                </div>
              </li>
            ))}
          </ul>
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
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="blue"
                className="size-10"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
