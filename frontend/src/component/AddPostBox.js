import React from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { Input, Button, DatePicker, Space } from "antd";
import { addPost } from "../api";



const { TextArea } = Input;
const AddPostBox = ({ setData }) => {
  function addTask() {
    setData(function (prev) {
      return [...prev, { id: v4(), topic, description, salary, ddl }];
    });
    addPost({topic, description, salary, ddl});
    console.log(topic, description, salary, ddl);
  }

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
    console.log(date, dateString);
    setDDL(dateString);
  }
  return (
    <>
      <TextArea rows={1} placeholder="任務名稱" onChange={topicChange} />
      <br />
      <TextArea rows={4} placeholder="任務內容簡介" onChange={descChange} />
      <TextArea rows={1} placeholder="酬勞" onChange={salaryChange} />
      <Space direction="vertical" size={12}>
        <DatePicker
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
      </Space>
      <Button onClick={addTask}>Post</Button>
    </>
  );
};
export default AddPostBox;
