import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import socket from "../../socket/socket";

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

  const handleSubmit = (values: { nickname: string; phone: string }) => {
    socket.emit("setUsername", values.nickname);
    localStorage.setItem("username", values.nickname);
    localStorage.setItem("number", values.phone);
    navigate("/chat");
    console.log("hola", values.nickname);
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
              <div className="text-xl font-bold">
                Regístrate para chatear con AMDIRION !!!
              </div>
              <div className="flex justify-center text-black  flex-col items-center ">
                <label htmlFor="nickname" className="text-white mb-2 text-lg font-bold">
                  Usuario
                </label>
                <Field
                  name="nickname"
                  type="text"
                  placeholder="Nickname"
                  className="rounded-md p-2"
                />
                <p className="text-[red] text-lg">
                  <ErrorMessage name="nickname" />
                </p>
              </div>
              <div className="flex justify-center text-black flex-col items-center">
                <label htmlFor="phone" className="text-white mb-2 text-lg font-bold">
                  Número
                </label>
                <Field
                  name="phone"
                  type="text"
                  placeholder="Número"
                  className="rounded-md p-2"
                />
                <p className="text-[red] text-lg">
                  <ErrorMessage name="phone" />
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-green-500 w-20 rounded-md"
                >
                  Enviar
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
