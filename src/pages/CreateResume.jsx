import { Input } from "antd";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostService from "../API/PostService";
import banner from "../img/ybanner-1.jpg";

const CreateResume = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [idResume, setIdResume] = useState("");

  const downloadResume = async () => {
    console.log(fileUrl);
    if (!fileUrl) {
    } else {
      await PostService.downloadResume(fileUrl);
    }
  };

  const resumeId = async () => {
    console.log(idResume);
    if (!idResume) {
    } else {
      await PostService.idResume(idResume);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${banner})`,
          height: "330px",
          width: "100%",
          zIndex: "1",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#FFD304",
          backgroundPosition: "right",
        }}
      >
        <h1 style={{ zIndex: "2" }}>Создать Резюме</h1>
      </div>
      <div className="resume">
        <div>
          <div></div>
          <div></div>
        </div>
        <Formik
          initialValues={{
            image: "",
            position: "",
            num_passport: "",
            full_name: "",
            nationality_gender: "",
            country_city_of_residence: "",
            date_of_birth: "",
            age_height_weight: "",
            status_children: "",
            health_smoker: "",
            image_full_height: "",
          }}
          onSubmit={async (values) => {
            const data = new FormData();

            Object.keys(values).forEach((field) =>
              data.append(field, values[field])
            );
            for (let [name, value] of data) {
              console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
            }
            const response = await axios.post(
              "https://zainkg.pythonanywhere.com/api/v1/resume/personal_data/",
              data
            );

            console.log(values.image.type);
            localStorage.setItem("id", response.data.id);

            // Скачивание файла
            console.log(response.data.file);
            setFileUrl(response.data.file.trim());
            console.log(JSON.stringify(values));
            console.log(response);
            // return  response
          }}
        >
          {(formProps) => (
            <Form>
              <div style={{ display: "flex", border: "2px solid black" }}>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRight: "1px solid black",
                  }}
                >
                  <input
                    name="image"
                    type="file"
                    onChange={(event) =>
                      formProps.setFieldValue("image", event.target.files[0])
                    }
                  />
                </div>
                <div
                  style={{
                    width: "200px",
                    height: "300px",
                    marginLeft: "20px",
                  }}
                >
                  <h2>Application form</h2>
                </div>
              </div>

              <div
                style={{
                  width: "200px",
                  height: "300px",
                  marginLeft: "20px",
                }}
              >
                <h2>Personal data</h2>
                <div style={{ display: "flex", border: "2px solid black" }}>
                  <div>First and last name</div>
                  <div
                    style={{
                      width: "300px",
                      height: "300px",
                      borderRight: "1px solid black",
                    }}
                  >
                    <Field name="position" type="text" />
                  </div>
                </div>
              </div>
              <h1>Позиция</h1>

              <br />
              <h2>Пасспорт</h2>
              <Field name="num_passport" type="text" />
              <br />
              <h2>Картинка</h2>
              <br />
              <h2>ФИО</h2>
              <Field name="full_name" type="text" />
              <br />
              <h2>Национальность</h2>
              <Field name="nationality_gender" type="text" />
              <br />
              <h2>Страна</h2>
              <Field name="country_city_of_residence" type="text" />
              <br />
              <h2>Дата рождения</h2>
              <Field name="date_of_birth" type="text" />
              <br />
              <h2>Возрать рост и вес</h2>
              <Field name="age_height_weight" type="text" />
              <br />
              <h2>Есть дети?</h2>
              <Field name="status_children" type="text" />
              <br />
              <h2>Здоровье</h2>
              <Field name="health_smoker" type="text" />
              <br />
              <h2>Полная картинка</h2>
              <input
                name="image_full_height"
                type="file"
                onChange={(event) =>
                  formProps.setFieldValue(
                    "image_full_height",
                    event.target.files[0]
                  )
                }
              />
              <br />
              <button type="submit">создать</button>
            </Form>
          )}
        </Formik>
        <br />
        <Formik
          initialValues={{
            language: "",
            written: "",
            spoken: "",
            understanding: "",
          }}
          onSubmit={async (values) => {
            let id = localStorage.getItem("id");
            const response = await axios.post(
              `https://zainkg.pythonanywhere.com/api/v1/resume/${id}/language/`,
              values
            );
            console.log(response);
          }}
        >
          <Form>
            <h2>Языки</h2>
            <Field name="language" type="text" />
            <h2>Чтение</h2>
            <Field name="written" type="text" />
            <br />
            <h2>Разговорный</h2>
            <Field name="spoken" type="text" />
            <br />
            <h2>Понимание</h2>
            <Field name="understanding" type="text" />
            <button type="submit">сохранить</button>
          </Form>
        </Formik>
        <br />
        <br />

        <h2>Skills</h2>
        <Formik
          initialValues={{
            skills: "",
            work_time: "",
            i_confirm: "",
          }}
          onSubmit={async (values) => {
            let id = localStorage.getItem("id");
            const response = await axios.post(
              `https://zainkg.pythonanywhere.com/api/v1/resume/${id}/skills/`,
              values
            );
            console.log(response);
          }}
        >
          <Form>
            <h2>Скилы</h2>
            <Field name="skills" type="text" />
            <h2>Занятость</h2>
            <Field name="work_time" type="text" />
            <br />
            <h2>Согласие</h2>
            <Field name="i_confirm" type="text" />
            <button type="submit">сохранить</button>
          </Form>
        </Formik>
        <br />
        <br />
        <h2>Образования</h2>
        <Formik
          initialValues={{
            university: "",
            specialization: "",
            duration: "",
            city_country: "",
          }}
          onSubmit={async (values) => {
            let id = localStorage.getItem("id");
            const response = await axios.post(
              `https://zainkg.pythonanywhere.com/api/v1/resume/${id}/education/`,
              values
            );
            console.log(response);
          }}
        >
          <Form>
            <h2>Университет</h2>
            <Field name="university" type="text" />
            <h2>Специализация</h2>
            <Field name="specialization" type="text" />
            <br />
            <h2>Продолжительность</h2>
            <Field name="duration" type="text" />
            <br />
            <h2>Страна, город</h2>
            <Field name="city_country" type="text" />
            <button type="submit">сохранить</button>
          </Form>
        </Formik>
        <br />
        <br />
        <h2>Опыт работы</h2>
        <Formik
          initialValues={{
            position: "",
            company_name: "",
            period_city_country: "",
            responsibilities: "",
          }}
          onSubmit={async (values) => {
            let id = localStorage.getItem("id");
            const response = await axios.post(
              `https://zainkg.pythonanywhere.com/api/v1/resume/${id}/workexperienceone/`,
              values
            );
            console.log(response);
          }}
        >
          <Form>
            <h2>Позиция</h2>
            <Field name="position" type="text" />
            <h2>Название компании</h2>
            <Field name="company_name" type="text" />
            <br />
            <h2>С какого даты работал</h2>
            <Field name="period_city_country" type="text" />
            <br />
            <h2>Обязанности</h2>
            <Field name="responsibilities" type="text" />
            <button type="submit">сохранить</button>
          </Form>
        </Formik>

        <button onClick={downloadResume}>Скачать</button>
        <br />
        {fileUrl && (
          <Link
            to={{ pathname: "https://zainkg.pythonanywhere.com/" + fileUrl }}
            target="_blank"
          >
            Скачать резюме
          </Link>
        )}
      </div>
    </div>
  );
};

export default CreateResume;
