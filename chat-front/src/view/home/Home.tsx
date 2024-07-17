import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Home = () => {
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

  return (
    <Formik
      initialValues={{
        nickname: "",
        phone: "",
      }}
      validationSchema={getValidationSchema()}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({}) => (
        <Form>
          <div>Regístrate para chatear con AMDIRION !!!</div>
          <div>
            <div>
              <Field name="nickname" type="text" placeholder="Nickname" />
              <ErrorMessage name="nickname" />
            </div>
            <div>
              <Field name="phone" type="text" placeholder="Número" />
              <ErrorMessage name="phone" />
            </div>
            <button type="submit">Enviar</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
