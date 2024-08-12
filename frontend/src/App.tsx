import { Link } from "react-router-dom";
import { Image } from "./assets/image/Image";

export const App = () => {
  return (
    <div className="flex flex-col rounded-2xl">
      {/* Div para la imagen ocupando el 60% del alto total */}
      <div
        className=" inset-0 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${Image.ImageChat})` }}
      >
        {/* Imagen dentro de la imagen principal */}
        <div className=" flex flex-col justify-between h-screen w-screen ">
          <div className="flex justify-center items-center content-center mt-14">
            <img
              src={Image.ImageLogo}
              className="w-[400px] h-auto mt-20 md:w-[500px]"
              alt=""
            />
          </div>
          {/* Div para el contenido ocupando el 40% restante */}
          <div className=" rounded-t-[60px] bg-violet-100 h-[300px]  border-2 relative flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-52 S gap-8">
              <div>
                <h1 className="text-purple-950 font-extrabold text-5xl ">
                  AmDiriom
                </h1>
                <p className="text-sm text-slate-600  text-center">
                  Personas conectadas en todo el mundo de forma gratuita
                </p>
              </div>
              <Link
                to="/register"
                className="bg-indigo-800 p-2 rounded-xl hover:bg-indigo-400 text-white "
              >
                ¡Inicia chat!
              </Link>
            </div>
            <p className="text-sm text-slate-600">create for:</p>
          </div>
        </div>
      </div>
    </div>
  );
};
