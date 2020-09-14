import React from "react";
import { Layout as AntLayout } from "antd";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <AntLayout>
      <Navigation />
      <AntLayout.Content className="content">{children}</AntLayout.Content>
    </AntLayout>
  );
};

export default Layout;
