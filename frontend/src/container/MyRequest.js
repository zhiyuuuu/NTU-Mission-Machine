import React, { useState, useEffect } from "react";
import { FileOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import MyRequestContent from "../component/MyRequestContent";
import { handleMyRequest, getRecordTask } from "../api";
const { Header, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("首頁", "main", <UserOutlined />),
  getItem("任務", "sub1", <FileOutlined />, [
    getItem("我發布的任務", "request"),
    getItem("我接到的任務", "task"),
  ]),
  getItem("登出", "logout", <LogoutOutlined />),
];
const MyRequest = () => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/");
  };
  const navigateToMainPage = () => {
    navigate("/mainpage", {
      state: {
        username: username,
      },
    });
  };
  const navigateToMyTasks = () => {
    navigate("/mytasks", {
      state: {
        username: username,
      },
    });
  };

  const { state } = useLocation();
  const username = state.username;

  const [collapsed, setCollapsed] = useState(false);
  const [remainTask, setRemainTask] = useState(0);
  const [selectedMenuItem, setSelectedMenuItem] = useState("request");
  const [tasks, setTasks] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    const asyncfunction = async () => {
      const data = await handleMyRequest(username);
      // console.log("my request data", data.content);
      setTasks(data.content);
    };
    asyncfunction();
  }, []);
  useEffect(() => {
    const asyncfunction = async () => {
      const data = await getRecordTask(username);
      //   console.log("all data", data);
      setRemainTask(data.content);
    };
    asyncfunction();
  }, []);
  const componentsSwtich = (key) => {
    switch (key) {
      case "main":
        navigateToMainPage();
        return;
      case "logout":
        navigateToSignIn();
        return;
      case "task":
        navigateToMyTasks();
        return;
      case "request":
        return <MyRequestContent tasks={tasks} username={username} />;
      default:
        break;
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            fontSize: 16,
            padding: "10px 0",
            height: 32,
            margin: 16,
            color: "#00D600",
            textAlign: "center",
          }}
        >
          NTU Mission Machine
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["request"]}
          mode="inline"
          items={items}
          onClick={(e) => setSelectedMenuItem(e.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            margin: "16px 0",
            background: colorBgContainer,
            textAlign: "right",
          }}
        >
          Ongoing task : {remainTask}
        </Header>

        <div>{componentsSwtich(selectedMenuItem)}</div>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MyRequest;
