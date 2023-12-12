import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LSButton from '../controls/Button/LSButton';



const Registrarme = ({ handleRegister }) => {
  const validationSchema = yup.object().shape({
    Email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es requerido'),
    Pass: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número'
      )
      .required('La contraseña es requerida'),
    Passreply: yup
      .string()
      .oneOf([yup.ref('Pass')], 'Las contraseñas deben coincidir')
      .required('La confirmación de contraseña es requerida'),
  });

  const formik = useFormik({
    initialValues: {
      Nombre: '',
      Email: '',
      Telefono: '',
      Pass: '',
      Passreply: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar el envío de los datos del formulario
      console.log(values);
    },
  });

  return (
    <div className="container">
      <h2>Formulario de Registro</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="Nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="Nombre"
            value={formik.values.Nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Email && !!formik.errors.Email}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.Email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Telefono">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="text"
            name="Telefono"
            value={formik.values.Telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>

        <Form.Group controlId="Pass">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="Pass"
            value={formik.values.Pass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Pass && !!formik.errors.Pass}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.Pass}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="Passreply">
          <Form.Label>Repetir Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="Passreply"
            value={formik.values.Passreply}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.Passreply && !!formik.errors.Passreply}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.Passreply}</Form.Control.Feedback>
        </Form.Group>
        
        <LSButton caption={'Registrarse'} variant="primary" onClick={handleRegister}  type="button" />
          

      </Form>
    </div>
  );
};

export default Registrarme;
