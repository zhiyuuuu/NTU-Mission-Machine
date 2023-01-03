import React, { useState } from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;

const MyRequestContent = () => {
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
        HelloRequeest
      </div>
    </Content>
  );
};

export default MyRequestContent;
