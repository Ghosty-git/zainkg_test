import {
  DollarOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";

const VacanciesById = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
    console.log(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  return (
    <div className="background-card">
      <div className="jobsId__content">
        <div className="jobsId__body">
          <h1 style={{ borderBottom: "2px solid black" }}>{post.job_title}</h1>
          <h1>Вы открыли страницу поста c ID = {params.id}</h1>
          <div>
            {post.name}. {post.description}
          </div>
          <div>
            <h2 style={{ borderBottom: "2px solid black" }}>Обязанность</h2>
            {post.responsibility}
          </div>
          <div>
            <h2 style={{ borderBottom: "2px solid black" }}>Benefits</h2>
            {post.benefits}
          </div>
        </div>

        <div className="jobsId__aside">
          <p>{post.responsibility}</p>
          <p>Зарплата : ${post.salary}</p>
          <p>Занятость: {post.work_time}</p>
        </div>
      </div>

      <div
        style={{ marginTop: "10px", marginLeft: "125px" }}
        className="jobsId__body"
      >
        <Formik
          initialValues={{
            full_name: "",
            email: "",
            phone: "",
            coverletter: "",
            upload_cv: "",
          }}
          
          onSubmit={async (values) => {
            alert(JSON.stringify(values))
            const token = localStorage.getItem("token");
            console.log(`Token ${token}`);

            const data =  new FormData();
            Object.keys(values).forEach((field) => {
                data.append(field, values[field])
            });
            console.log(data)
            // for (let [name, value] of data) {
            //     console.log(`${name} = ${value}`);
            // }
            const response = await axios(
              `https://zainkg.pythonanywhere.com/api/v1/jobs/${params.id}/application/`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Token " + token,
                },
                data: data
              }
            ).then();
            console.log(response);
          }}
        >
          {(formProps) => (
            <Form>
              <h2>Оставить заявку на вакансию</h2>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Field
                  className="input__email"
                  name={`full_name`}
                  type="text"
                  placeholder="Ф.И.О"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Field
                    className="input__email"
                    name="email"
                    type="email"
                    placeholder="Почта"
                  />
                </div>
              </div>

              <Field
                className="input"
                name="phone"
                type="text"
                placeholder="Телефон"
              />

              <Field
                className="input"
                name="coverletter"
                type="text"
                placeholder="Письмо"
              />
              <h3>Загрузить Резюме</h3>
              <input
                name="upload_cv"
                type="file"
                onChange={(event) =>
                  formProps.setFieldValue("upload_cv", event.target.files[0])
                }
              />

              <button type="submit">отправить</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VacanciesById;
