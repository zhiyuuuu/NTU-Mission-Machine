// current not using

import React, { useState } from "react";
import { Layout, theme } from "antd";
import Task from "./Task";
import AddPostBox from "./AddPostBox";
const { Content } = Layout;

const MainPageContent = () => {
  const [data, setData] = useState([]);
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
        <AddPostBox setData={setData} />
        <br />
        <br />
        {data.map((task) => {
          const { id, topic, salary, ddl } = task;
          return (
            <Task key={id} id={id} topic={topic} salary={salary} due={ddl} />
          );
        })}
      </div>
    </Content>
  );
};

export default MainPageContent;
