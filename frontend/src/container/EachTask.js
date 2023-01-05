import React, { useEffect } from "react";
import { Card, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
// import { handleEachTask } from "../api";
import { Button } from "antd";
import { handleApply, updateDoneStatus } from "../api";

const EachTask = () => {
  const displayStatus = (s) => {
    const type = s.message;
    const content = { content: s.message, duration: 3 };
    switch (type) {
      case "success":
        message.success("成功!!");
        break;
      case "error":
      default:
        message.error(content);
        break;
    }
  };
  const handleClick = async () => {
    const public_status = false;
    let response = await handleApply({ id, username, public_status });
    displayStatus(response);
  };

  const handleDoneClick = async () => {
    const done_status = true;
    let response = await updateDoneStatus({ id, done_status });
    displayStatus(response);
  };

  const navigate = useNavigate();
  const backToMainpage = () => {
    navigate("/mainpage", {
      state: {
        username: username,
      },
    });
  };

  const { state } = useLocation();
  const id = state.id;
  const topic = state.topic;
  const description = state.description;
  const salary = state.salary;
  const due = state.due;
  const username = state.curUserName;
  const public_status = state.public_status;
  const issuer = state.issuer;
  const receiver = state.receiver;
  const done_status = state.done_status;
  let isIssuer = false;
  let isReceiver = false;
  if (issuer === username) {
    isIssuer = true;
  }
  if (receiver === username) {
    isReceiver = true;
  }

  let button_status = "";
  if (public_status) {
    if (isIssuer === true) {
      button_status = "issue";
    } else {
      button_status = "open";
    }
  } else {
    // console.log(isIssuer);
    if (isIssuer === true) {
      button_status = "issue";
    } else if (isReceiver) {
      button_status = "receive";
    } else {
      button_status = "closed";
    }
  }
  const componentsSwtich = (key) => {
    switch (key) {
      case "open":
        return (
          <Button type="primary" size={"large"} onClick={handleClick}>
            應徵!!
          </Button>
        );
      case "closed":
        return (
          <Button type="dashed" size={"large"} danger>
            已徵到善心人士🥰
          </Button>
        );
      case "issue":
        return <div></div>;
      case "receive":
        console.log(done_status);
        return done_status ? (
          <Button type="dashed" size={"large"} danger>
            功成身退
          </Button>
        ) : (
          <Button type="primary" size={"large"} onClick={handleDoneClick}>
            任務完成
          </Button>
        );
      default:
        break;
    }
  };
  return (
    <div style={{ margin: "3em", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1
        style={{
          textAlign: "center",
          color: "green",
        }}
      >
        NTU Mission Machine
      </h1>
      <Card
        title={topic}
        bordered={false}
        style={{
          width: "60%",
        }}
      >
        <h3>詳細任務內容 : </h3>
        <p>{description}</p>
        <h3>報酬 : </h3>
        <p>{salary}</p>
        <h3>在甚麼時候前完成?</h3>
        <p>{due}</p>
        {componentsSwtich(button_status)}
      </Card>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button onClick={backToMainpage}>
          回首頁
        </Button>
      </div>
    </div>
  );
};
export default EachTask;
