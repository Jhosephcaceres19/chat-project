import { Link } from "react-router-dom";
import { Image } from "./assets/image/Image";

export const App = () => {
  return (
    <div className="flex flex-col rounded-2xl">
      {/* Div para la imagen ocupando el 60% del alto total */}
      <div className=" inset-0 bg-cover bg-center relative"
      style={{backgroundImage: `url(${Image.ImageChat})`}}
      >
        {/* Imagen dentro de la imagen principal */}
        <div className=" flex flex-col justify-between h-screen w-screen">
          <div className="flex justify-center ">
          <img src={Image.ImageLogo} className="w-[400px] h-[400px] mt-20" alt="" />
          </div>
          {/* Div para el contenido ocupando el 40% restante */}
          <div className=" rounded-t-[60px] bg-violet-100 h-[300px]  border-2 relative flex flex-col items-center justify-center">
            <h1 className="text-purple-950 font-extrabold text-5xl">
              AmDiriom
            </h1>
            <p className="text-sm text-slate-600  text-center">
              Personas conectadas en todo el mundo de forma gratuita
            </p>
            <Link
              to="/register"
              className="bg-indigo-800 p-2 rounded-xl hover:bg-indigo-400 text-white mt-24"
            >
              ¡Inicia chat!
            </Link>
            <p className="text-sm text-slate-600">create for:</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};
