import { Col, Row } from "antd";
import React from "react";
import Sidebar from "../../components/sidebar";
import SearchBox from "../../components/searchBox";
import { Outlet } from "react-router-dom";
import "./mainLayout.css";

function MainLayout() {
  return (
    <div className="container">
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }}>
          <div className="main__container">
            <SearchBox />
            <Outlet />
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
}

export default MainLayout;
