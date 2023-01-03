import React, { useState } from "react";
import { Layout, theme } from "antd";
import Task from "./Task";
const { Content } = Layout;

const MyTaskContent = () => {
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
        <Task />
      </div>
    </Content>
  );
};

export default MyTaskContent;
