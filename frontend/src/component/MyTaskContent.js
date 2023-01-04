import React, { useEffect } from "react";
import { Layout, theme } from "antd";
import { recordTask } from "../api";
import AppliedTask from "./AppliedTask";
const { Content } = Layout;

const MyTaskContent = ({ tasks, username }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let taskCnt = 0;
  // console.log(tasks[0]);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === false) {
      taskCnt++;
    }
  }
  useEffect(() => {
    const asyncfunction = async () => {
      const data = await recordTask(taskCnt, username);
      console.log("taskCnt data", data.content);
      // setTasks(data.content);
    };
    asyncfunction();
  }, []);
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
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
              <AppliedTask
                key={task._id}
                id={task._id}
                topic={task.name}
                issuer={task.issuer}
                description={task.detail}
                salary={task.salary}
                due={task.due}
                public_status={task.public_status}
                receiver={task.receiver}
                curUserName={username}
                done_status={task.done}
              />
            </div>
          );
        })}
      </div>
    </Content>
  );
};

export default MyTaskContent;
