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
  };

  return (
    <Formik
      initialValues={{ nickname: "", phone: "" }}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>Regístrate para chatear con AMDIRION !!!</div>
          <div>
            <Field name="nickname" type="text" placeholder="Nickname" />
            <ErrorMessage name="nickname" />
          </div>
          <div>
            <Field name="phone" type="text" placeholder="Número" />
            <ErrorMessage name="phone" />
          </div>
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};
