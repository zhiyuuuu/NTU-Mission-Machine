import React, { useState } from "react";
import { Layout, theme } from "antd";
import Task from "./Task";
const { Content } = Layout;

const MyRequestContent = ({ tasks }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
        }}
      >
        {tasks.map((task) => {
          const { id, topic, salary, ddl } = task;
          return (
            <Task key={id} id={id} topic={topic} salary={salary} due={ddl} />
          );
        })}
      </div>
    </Content>
  );
};

export default MyRequestContent;
