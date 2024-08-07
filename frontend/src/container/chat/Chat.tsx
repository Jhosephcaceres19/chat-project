import { Link } from "react-router-dom";

export const Chat = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <nav className="flex justify-around items-center p-4 bg-violet-100 w-full top-0  z-10 rounded-b-2xl ">
        <Link to="/contact">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="purple"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <div>user</div>
      </nav>
      <main className="flex-grow p-8 mt-14">meage</main>
      <footer className="flex p-2 bg-violet-100 items-center justify-around  bottom-0  rounded-t-2xl">
        <input type="text" placeholder="Escribir" className="p-2" />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="purple"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </footer>
    </div>
  );
};
