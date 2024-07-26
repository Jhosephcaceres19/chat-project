// src/view/home/Register.tsx
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("/");

export const Register = () => {
  const navigate = useNavigate();

  const getValidationSchema = () => {
    return Yup.object({
      nickname: Yup.string()
        .max(8, "El apodo del usuario no debe pasar más de 8 caracteres")
        .required("Requerido"),
      phone: Yup.string()
        .length(8, "El número debe tener 8 dígitos")
        .matches(/^\d+$/, "Debe ser un número entero")
        .required("Requerido"),
    });
  };

  const handleSubmit = (values: { nickname: string }) => {
    socket.emit("setUsername", values.nickname);
    localStorage.setItem("username", values.nickname);
    navigate("/chat");
    console.log("hola",values.nickname)
  };

  return (
    <Formik
      initialValues={{ nickname: "", phone: "" }}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="bg-gradient-to-b from-black via-sky-800 to-sky-700 h-screen text-white">
          <Form className=" flex flex-col justify-center items-center h-screen ">
            <div className="border-solid border-2 border-black rounded-md p-4 flex flex-col justify-center gap-6">
              <div>Regístrate para chatear con AMDIRION !!!</div>
              <div className="flex justify-center text-black flex-col items-center">
                <Field name="nickname" type="text" placeholder="Nickname" />
                <ErrorMessage name="nickname" />
              </div>
              <div className="flex justify-center text-black flex-col items-center">
                <Field name="phone" type="text" placeholder="Número" />
                <ErrorMessage name="phone" />
              </div>
              <div className="flex justify-center">
              <button type="submit" className="bg-emerald-400 w-20  hover:bg-yellow-400">Enviar</button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
