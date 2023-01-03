import React from "react";
import { Layout, theme } from "antd";
import Task from "./Task";
const { Content } = Layout;

const MyTaskContent = ({ tasks }) => {
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
          return (
            <Task
              key={task._id}
              id={task._id}
              topic={task.name}
              description={task.detail}
              salary={task.salary}
              due={task.due}
            />
          );
        })}
      </div>
    </Content>
  );
};

export default MyTaskContent;
