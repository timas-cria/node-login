import './App.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Axios from "axios";

function App() {
  const handleCLickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password
    }).then((response) => {
      console.log(response);
    });
  }

  const validationLogin = new yup.object().shape({
    email: yup.string().email("Isto não é um email!").required("Este campo é obrigatório!"),
    password: yup.string().min(8, "Senha minimo 8 caracteres!").required("Este campo é obrigatório!")
  });

  const handleCLickSignUp = (values) => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      email: values.email,
      password: values.password
    }).then((response) => {
      console.log(response);
    });
  }

  const validationSignUp = new yup.object().shape({
    name: yup.string().required("Este campo é obrigatório!"),
    email: yup.string().email("Isto não é um email!").required("Este campo é obrigatório!"),
    password: yup.string().min(8, "Senha minimo 8 caracteres!").required("Este campo é obrigatório!"),
    confirmPassword: yup.string().required("Este campo é obrigatório!").oneOf([yup.ref('password'), null], "As senhas não são iguais!")
  });

  return (
    <div className='container'>
      <h1>Login</h1>
      <Formik initialValues={{}} onSubmit={handleCLickLogin} validationSchema={validationLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error"/>
          </div>
          {/*Outro campo*/}
          <div className="form-group">
            <Field name="password" type='password' className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error"/>
          </div>
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>

      <h1>Sign up</h1>
      <Formik initialValues={{}} onSubmit={handleCLickSignUp} validationSchema={validationSignUp}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="name" className="form-field" placeholder="Name" />
            <ErrorMessage component="span" name="name" className="form-error"/>
          </div>
          {/*Outro campo*/}
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error"/>
          </div>
          {/*Outro campo*/}
          <div className="form-group">
            <Field name="password" type='password' className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error"/>
          </div>
          {/*Outro campo*/}
          <div className="form-group">
            <Field name="confirmPassword" type='password' className="form-field" placeholder="Confirme a senha" />
            <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
          </div>
          <button className="button" type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>

  )
}

export default App
