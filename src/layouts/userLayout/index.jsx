import { Col, Row } from "antd";
import React from "react";
import UserSidebar from "../../components/userSidebar";
import { Outlet } from "react-router-dom";
import "./userLayout.css";

function UserLayout() {
  return (
    <div className="container">
      <Row>
        <Col xs={{ span: 3 }} md={{ span: 6 }}>
          <UserSidebar />
        </Col>
        <Col xs={{ span: 21 }} md={{ span: 18 }}>
          <div className="user__container">
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UserLayout;
