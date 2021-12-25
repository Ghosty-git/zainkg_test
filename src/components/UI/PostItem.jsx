import { Button, Card } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PostService from "../../API/PostService";
import { useFetching } from "../../hooks/useFetching";
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";

export const PostItem = (props) => {
  const route = useHistory();

  return (
    <div className="post">
      <div className="post__content">
        <div className="post__job_image">
          <img
            className="post__image"
            src={props.post.image}
            alt="jobs_image"
          />
        </div>

        <div className="post__job_content">
          <h3 className="post__job_title">{props.post.job_title}</h3>
          <div className="post__job__content__title">
            <div className="post__job__content__desc">
              <div className="icon__content">
                <EnvironmentOutlined className="icon"/>
                <p>{props.post.country}</p>
              </div>
            </div>
            <div className="post__job__content__desc">
              <FieldTimeOutlined className="icon" />
              {props.post.work_time}
            </div>
            <div className="post__job__content__desc">
              <DollarOutlined className="icon" />
              {props.post.salary}
            </div>
          </div>
        </div>
        <div>
        <div>
        <Button className="button" style={{marginTop:"35px", marginLeft:"20px"}} onClick={() => route.push(`/vacancies/${props.post.id}`)}>
          Открыть
        </Button>
        </div>
        </div>

      </div>
    </div>
  );
};
