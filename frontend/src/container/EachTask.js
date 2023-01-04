import React, { useEffect } from "react";
import { Card, message } from "antd";
import { useLocation } from "react-router-dom";
// import { handleEachTask } from "../api";
import { Button } from "antd";
import { handleApply, updateDoneStatus } from "../api";

const EachTask = () => {
  const displayStatus = (s) => {
    const type = s.message;
    console.log("message type:", type);
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
    // console.log(response);
    displayStatus(response);
  };

  const handleDoneClick = async () => {
    const done_status = true;
    let response = await updateDoneStatus({ id, done_status });
    displayStatus(response);
  };

  const { state } = useLocation();
  //console.log(state);
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
    // console.log("yooooooo");
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
            已徵到善心人士了( ´▽｀)
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
            已完成
          </Button>
        );
      default:
        break;
    }
  };
  //   console.log("eachTask", public_status);
  return (
    <div>
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
          width: "auto",
        }}
      >
        <h3>詳細任務內容 : </h3>
        <p>{description}</p>
        <h3>報酬 : </h3>
        <p>{salary}</p>
        <h3>在甚麼時候前完成?</h3>
        <p>{due}</p>
        {/* {isIssuer? <></>:} */}
        {/* {public_status ? (
          <Button type="primary" size={"large"} onClick={handleClick}>
            應徵!!
          </Button>
        ) : (
          //   <Button type="dashed" size={"large"} danger onClick={handleClick}>
          <Button type="dashed" size={"large"} danger>
            已徵到善心人士了( ´▽｀)
          </Button>
        )} */}
        {componentsSwtich(button_status)}
        {console.log(button_status)}
        {/* {console.log(isIssuer)} */}
      </Card>
    </div>
  );
};
export default EachTask;
