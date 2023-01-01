import React, { useState } from "react";
import { FileOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Title from "../component/Title";
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
  getItem("用戶", "1", <UserOutlined />),
  getItem("任務", "sub1", <FileOutlined />, [
    getItem("我發布的任務", "2"),
    getItem("我接到的任務", "3"),
  ]),
  getItem("登出", "4", <LogoutOutlined />),
];
const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [remainTask, setRemainTask] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            // display: "flex",
            margin: "16px 0",
            // padding: 20,
            background: colorBgContainer,
            textAlign: "right",
          }}
        >
          Ongoing task : {remainTask}
        </Header>
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
            Bill is a cat.
          </div>
        </Content>
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
