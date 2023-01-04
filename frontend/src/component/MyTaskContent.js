import { Layout, theme } from "antd";
import AppliedTask from "./AppliedTask";
const { Content } = Layout;

const MyTaskContent = ({ tasks, username }) => {
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
