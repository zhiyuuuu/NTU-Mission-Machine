import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { Input, Button, DatePicker, Space, Checkbox } from "antd";
import { addPost } from "../api";

const { TextArea } = Input;
const AddPostBox = ({ setData, curUserName }) => {
  const addTask = async () => {
    setData(function (prev) {
      return [
        ...prev,
        { id: v4(), topic, description, salary, ddl, curUserName },
      ];
    });
    let response = await addPost({
      topic,
      description,
      salary,
      ddl,
      curUserName,
    });
    console.log(response); //message: "success"
    //console.log(topic, description, salary, ddl);
  };

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [ddl, setDDL] = useState("");

  function topicChange(e) {
    setTopic(e.target.value);
  }

  function descChange(e) {
    setDescription(e.target.value);
  }

  function salaryChange(e) {
    setSalary(e.target.value);
  }

  function ddlChange(date, dateString) {
    //console.log(date, dateString);
    if (ddl !== "ASAP") {
      setDDL(dateString);
    } else {
      alert('You can only choose either ASAP or specific data :(((')
    }
  }

  const handleCheckbox = () => {
    if (ddl === "ASAP") {
      setDDL("")
    } else {
      setDDL("ASAP");
    }
    //console.log('ddl: ', ddl);
  }

  const style = { margin: "10px", width: "90%" }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      //background: "black",
      padding: "10px"
    }}>
      <TextArea rows={1} placeholder="任務名稱" onChange={topicChange} style={style} />
      <TextArea rows={4} placeholder="任務內容簡介" onChange={descChange} style={style} />
      <TextArea rows={1} placeholder="酬勞" onChange={salaryChange} style={style} />
      <Space direction="vertical" 
        size={12} 
        style={{ display: "flex", 
          justifyContent: "space-between", 
          flexDirection: "row", 
          alignItems: "center" }}>
        <DatePicker
          style={{ margin: "10px", width: "auto" }}
          onChange={ddlChange}
          dateRender={(current) => {
            const style = {};
            if (current.date() === 1) {
              style.border = "1px solid #1890ff";
              style.borderRadius = "50%";
            }

            return (
              <div className="ant-picker-cell-inner" style={style}>
                {current.date()}
                {/* {ddlChange(current.date())} */}
              </div>
            );
          }}
        />
        <Checkbox onChange={handleCheckbox}> ASAP </Checkbox>
        <Button onClick={addTask} style={{ margin: "10px" }} type="primary" >Post</Button>
      </Space>
      {/* <Button onClick={addTask} style={{ margin: "10px" }} >Post</Button> */}
    </div>
  );
};
export default AddPostBox;
