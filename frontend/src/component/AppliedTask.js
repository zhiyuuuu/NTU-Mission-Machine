import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const AppliedTask = ({
  id,
  topic,
  issuer,
  description,
  salary,
  due,
  public_status,
  receiver,
  curUserName,
  done_status,
}) => {
  const navigate = useNavigate();

  const navigateToTask = (id) => {
    navigate(`/eachtask/:${id}`, {
      state: {
        id: id,
        description: description,
        topic: topic,
        issuer: issuer,
        receiver: receiver,
        salary: salary,
        due: due,
        public_status: public_status,
        curUserName: curUserName,
        done_status: done_status,
      },
    });
  };
  return (
    <div onClick={() => navigateToTask(id)}>
      <Card
        title={topic}
        bordered={true}
        style={{
          width: "auto",
        }}
      >
        <h3>報酬 : </h3>
        <p>{salary}</p>
        <h3>在甚麼時候前完成?</h3>
        <p>{due}</p>
        {/* {public_status ? <StopOutlined /> : <CheckCircleOutlined />} */}
        <h3>目前狀態 :</h3>
        {done_status ? <p>已完成</p> : <p>尚未完成</p>}
      </Card>
    </div>
  );
};
export default AppliedTask;
