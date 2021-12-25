import React from "react";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../store/actions/auth";
import * as yup from "yup"
import apiErrorHandler from "../services/apiErrorHandler";
import { Button } from "antd";

const Register = () => {
    const dispatch = useDispatch()
    const {signup} = useSelector((state) => state.auth)

    const validationsShema = yup.object().shape({
      username: yup.string().typeError("Должно быть строкой").required("Обязательно"),
      email: yup.string().typeError("Должно быть строкой").required("Обязательно") ,
      password: yup.string().typeError("Должно быть строкой").required("Обязательно"),
      first_name: yup.string().typeError("Должно быть строкой").required("Обязательно"),
      last_name: yup.string().email("Введите верный email").required("Обязательно"),
    })
  return (
    <div>
      <h1 style={{ marginLeft:"680px" }}>Регистрация</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
        }}
        validateOnBlur
        onSubmit={(values) => {
        dispatch(signupAction(values));
          console.log(JSON.stringify(values,));
        }}
        validationShema={validationsShema}
      >
        {({values, errors, touched, handleBlur, handleChange, isValid, handleSubmit, dirty}) => (
          <Form>
            <div className={`from`} style={{marginBottom:"50px"}}>
              <p>
                <label htmlFor={`username`}>Логин</label>
                <input className="input" name={`username`} type={`text`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                 />
              </p>
              {touched.username && errors.username && <p className={`error`}>{errors.username}</p>}

              <p>
                <label htmlFor={`email`}>Почта</label>
                <input className="input" name={`email`} type={`text`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                 />
              </p>
              {touched.email && errors.email && <p className="error">{errors.email}</p>}

              <p>
                <label htmlFor={`password`}>Пароль</label>
                <input className="input" name={`password`} type={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                 />
              </p>
              {touched.password && errors.password && <p className="error">{errors.password}</p>}

              <p>
                <label htmlFor={`first_name`}>Имя</label>
                <input className="input" name={`first_name`} type={`text`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                 />
              </p>
              {touched.first_name && errors.first_name && <p className="error">{errors.first_name}</p>}

              <p>
                <label htmlFor={`last_name`}>Имя</label>
                <input className="input" name={`last_name`} type={`text`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                 />
              </p>
              {touched.last_name && errors.last_name && <p className="error">{errors.last_name}</p>}
              
              <Button style={{marginLeft:"100px"}} type="submit" disabled ={!isValid && !dirty} onClick={handleSubmit}>Зарегистрироваться</Button>
            </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
