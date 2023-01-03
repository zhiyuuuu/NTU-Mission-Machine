import { Card } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const Task = ({
  id,
  topic,
  description,
  salary,
  due,
  public_status,
  curUserName,
}) => {
  const navigate = useNavigate();

  const navigateToTask = (id) => {
    navigate(`/eachtask/:${id}`, {
      state: {
        id: id,
        description: description,
        topic: topic,
        salary: salary,
        due: due,
        public_status: public_status,
        curUserName: curUserName,
      },
    });
  };
  return (
    <div onClick={() => navigateToTask(id)}>
      <Card
        title={topic}
        bordered={false}
        style={{
          width: "auto",
        }}
      >
        <h3>報酬 : </h3>
        <p>{salary}</p>
        <h3>在甚麼時候前完成?</h3>
        <p>{due}</p>
        {public_status ? <StopOutlined /> : <CheckCircleOutlined />}
      </Card>
    </div>
  );
};
export default Task;
