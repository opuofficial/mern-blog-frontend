import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row } from "antd";
import "./changePassword.css";

import useApi from "../../hooks/useApi";

import toast from "react-hot-toast";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { sendRequest, data, isLoading, error } = useApi();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    sendRequest("PUT", "/user/change-password", requestData);
  };

  console.log(data);

  useEffect(() => {
    if (data) {
      toast.success(data.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
    }
  }, [error]);

  return (
    <section id="change__password">
      <h2 className="heading">Change Password</h2>

      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 18 }}
          md={{ span: 16 }}
          lg={{ span: 12 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="input__group">
              <label htmlFor="">Current Password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="input__group">
              <label htmlFor="">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input__group">
              <label htmlFor="">Confirm New Password</label>
              <Input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </form>
        </Col>
      </Row>
    </section>
  );
}

export default ChangePassword;
