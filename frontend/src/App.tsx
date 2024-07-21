import { Link } from "react-router-dom";
export const App = () => {
  return (
    <div className="bg-gradient-to-b from-black via-sky-800 to-sky-700 flex  h-screen justify-around pt-4">
      <div className="text-5xl font-extrabold flex  ">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          AmDirion
        </h1>
      </div>
      <div>
        <Link
          to="/register"
          className="border-solid border-2 rounded-md text-white text-2xl content-center"
        >
          Chatear...
        </Link>
      </div>
    </div>
  );
};
