import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions/auth";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import { Button } from "antd";
const Login = () => {
  const dispatch = useDispatch()
  const { login } = useSelector((state) => state.auth);
  return (
    <>
      <h1>Логин</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        
        onSubmit={(values) => {
          dispatch(loginAction(values));
          console.log(JSON.stringify(values, null, 2));
        }}
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
              {touched.username && errors.username && <p className="error">{errors.username}</p>}

              <p>
                <label htmlFor={`password`}>Пароль</label>
                <input className="input" name={`password`} type={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                 />
              </p>
              {touched.password && errors.password && <p className="error">{errors.password}</p>}

              <Link to={"/register"}>У вас нет аккаунта?</Link>

              <Button style={{marginLeft:"6px"}} type="submit" disabled ={!isValid && !dirty} onClick={handleSubmit} to={"/home"}>Войти</Button>
            </div>
        </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
