import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navigation = () => {
  return (
    <Header className="flex justify-between">
      <div className="logo">Logo</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About Us</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navigation;
