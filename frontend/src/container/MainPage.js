import React, { useState, useEffect } from "react";
import { FileOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Task from "../component/Task";
import AddPostBox from "../component/AddPostBox";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAllTasks, getRecordTask } from "../api";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("首頁", "1", <UserOutlined />),
  getItem("任務", "sub1", <FileOutlined />, [
    getItem("我發布的任務", "2"),
    getItem("我接到的任務", "3"),
  ]),
  getItem("登出", "4", <LogoutOutlined />),
];
const MainPage = () => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/");
  };
  const navigateToMyTasks = () => {
    navigate("/mytasks", {
      state: {
        username: currentUser,
      },
    });
  };
  const navigateToMyRequest = () => {
    navigate("/myrequest", {
      state: {
        username: currentUser,
      },
    });
  };

  const { state } = useLocation();
  const currentUser = state.username;

  const [collapsed, setCollapsed] = useState(false);
  const [remainTask, setRemainTask] = useState(0);
  const [data, setData] = useState([]); //for add
  const [allTasks, setAllTasks] = useState([]); //for add
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    const asyncfunction = async () => {
      const data = await handleAllTasks();
      //console.log("all data", data);
      setAllTasks(data.content);
    };
    asyncfunction();
  }, [data]);

    useEffect(() => {
      const asyncfunction = async () => {
        const data = await getRecordTask(currentUser);
        //console.log("remainTask", data);
        setRemainTask(data.content);
      };
      asyncfunction();
    }, []);

  const componentsSwtich = (key) => {
    switch (key) {
      case "1":
        return (
          <Content
            style={
              {
                //margin: "0 16px",
              }
            }
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <AddPostBox setData={setData} curUserName={currentUser} />
              <div style={{ display: "flex", flexDirection: "column-reverse", marginTop: "20px", width: "60%" }}>
                {allTasks.map((task) => {
                  return (
                    <Task
                      key={task._id}
                      description={task.detail}
                      issuer={task.issuer}
                      receiver={task.receiver}
                      id={task._id}
                      topic={task.name}
                      salary={task.salary}
                      due={task.due}
                      public_status={task.public_status}
                      curUserName={currentUser}
                      done_status={task.done}
                    />
                  );
                })}
              </div>
            </div>
          </Content>
        );
      case "4":
        navigateToSignIn();
        return;
      case "3":
        navigateToMyTasks();
        return;
      case "2":
        navigateToMyRequest();
        return;
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
          defaultSelectedKeys={["1"]}
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
export default MainPage;
