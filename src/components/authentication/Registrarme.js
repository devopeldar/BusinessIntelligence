import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import LSButtonRegister from "../controls/Button/LSButtonRegister";
import API_URL from "../../config";
import { useNavigate } from 'react-router-dom';

const Registrarme = () => {
  const validationSchema = yup.object().shape({
    Nombre: yup.string().required("El campo Nombre es requerido"),
    Telefono: yup.string().required("El campo Telefono es requerido"),
    Email: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    Pass: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número"
      )
      .required("La contraseña es requerida"),
    Passreply: yup
      .string()
      .oneOf([yup.ref("Pass")], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),
  });

  const [grabando, setGrabando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const history = useNavigate();
  const [emailuser, setEmailuser] = useState('');

  const formik = useFormik({
    initialValues: {
      Nombre: "",
      Email: "",
      Telefono: "",
      Pass: "",
      Passreply: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        setGrabando(true); // Inicia la grabación

        const response = await fetch(API_URL + "/UsuarioAlta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(response);

        const res = await response.json();

        console.log(res.rdoAccion);
        // Manejar la lógica después de actualizar el perfil
        if (res.rdoAccion) {
          // Manejar respuesta exitosa
          setMensaje("¡Usuario Registrado exitosamente!");
          history(`/confirmacion/${values.Email}`);
        } else {
          // Manejar errores si la respuesta no es exitosa
          setMensaje(res.rdoAccionDesc);
          setGrabando(true); // Inicia la grabación

        }
      } catch (error) {
        setMensaje("Error en la solicitud el usuario no pudo ser registrado");
        setGrabando(true); // Inicia la grabación
        console.log("Error en la solicitud:" + error);
      }
    },
  });

  return (
    <div className="container registerpage">
      <h2>Registro de Usuario</h2>
      <Form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Form.Group controlId="Nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="Nombre"
            autoComplete="off"
            value={formik.values.Nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Nombre && !!formik.errors.Nombre}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.Nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="Email"
            autoComplete="off"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Email && !!formik.errors.Email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.Email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Telefono">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="text"
            name="Telefono"
            autoComplete="off"
            value={formik.values.Telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Telefono && !!formik.errors.Telefono}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.Telefono}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Pass">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="Pass"
            autoComplete="off"
            value={formik.values.Pass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Pass && !!formik.errors.Pass}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.Pass}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Passreply">
          <Form.Label>Repetir Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="Passreply"
            autoComplete="off"
            value={formik.values.Passreply}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Passreply && !!formik.errors.Passreply}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.Passreply}
          </Form.Control.Feedback>
        </Form.Group>

        <LSButtonRegister
          caption={"Registrarse"}
          disabled={grabando}
          className="buttonnodal btn btn-primary"
        />
      </Form>
        {/* Mensaje de grabación */}
        {mensaje && (
        <div className="alert alert-success mt-3" role="alert">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default Registrarme;
