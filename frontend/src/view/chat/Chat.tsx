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
    <div className="bg-gradient-to-b from-black via-sky-800 to-sky-700 text-white grid grid-cols-3 justify-center h-screen">
      <div className="hidden md:flex flex-col col-span-1 border-solid border-2 border-black m-10 ">
        <div className="font-extrabold text-3xl text-white rounded-t-2xl bg-gradient-to-r from-sky-800 via-sky-600 to-sky-500 w-full h-auto flex flex-col justify-center items-center p-2 gap-2">
          {username}
          <img
            src={image || "defauld image.jpg"}
            alt={username || "usuario"}
            className="w-24 h-auto rounded-full"
          />
          <div className="flex gap-3  ml-2 text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>

            {number}
          </div>
        </div>

        <div className="mt-20">user conected:</div>
      </div>
      <div className="col-span-3 md:col-span-2 border-solid border-2 border-black bg-slate-300 rounded-xl m-10 flex flex-col justify-between">
        <div className="p-4 h-auto">
          <ul className="text-white">
            {messages.map((msg, i) => (
              <li
                key={i}
                className={`my-2 p-2 table text-md rounded-md ${
                  msg.from === username ? "bg-sky-600 ml-auto" : "bg-sky-950"
                }`}
              >
                <div className="flex flex-row items-center gap-3">
                <img src={image || 'image'} alt={username || 'username'} className="w-10 h-auto rounded-full"/>{msg.from}: <p className="text-xl">{String(msg.body)}</p>
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
