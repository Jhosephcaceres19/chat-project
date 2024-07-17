import { Link } from "react-router-dom";
export const App = () => {
  return (
    <div className="bg-gradient-to-b from-black via-sky-800 to-sky-700 flex gap-8 justify-center">
      <div className="text-5xl font-extrabold flex justify-center h-screen ">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          AmDirion
        </h1>
      </div>
      <div>
        <Link
          to="/chat"
          className="border-solid border-2 rounded-md text-white text-2xl"
        >
          Chatear...
        </Link>
      </div>
    </div>
  );
};
