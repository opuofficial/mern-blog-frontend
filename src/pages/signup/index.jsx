import React, { useEffect, useState } from "react";
import "./signup.css";
import { Button, Col, Row } from "antd";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import useApi from "../../hooks/useApi";

import toast from "react-hot-toast";

function Signup() {
  const { sendRequest, data, isLoading, error } = useApi();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    const requestData = {
      email,
      username,
      password,
      confirmPassword,
    };

    sendRequest("POST", "/auth/signup", requestData);
  };

  useEffect(() => {
    if (data?.status == 201) {
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      toast.success(data.data.message);
      return navigate("/login");
    }

    if (error) {
      toast.error(error.response.data.message);
    }
  }, [data, error]);

  return (
    <section id="signup">
      <div className="container">
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 18, offset: 3 }}
            md={{ span: 14, offset: 5 }}
            lg={{ span: 10, offset: 7 }}
          >
            <div className="signup__form">
              <h3>Create Account</h3>

              <form onSubmit={handleSignup}>
                <div className="input__group">
                  <Input
                    placeholder="Email"
                    prefix={<FontAwesomeIcon icon={faEnvelope} />}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="input__group">
                  <Input
                    placeholder="Username"
                    prefix={<FontAwesomeIcon icon={faUser} />}
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="input__group">
                  <Input
                    placeholder="Password"
                    prefix={<FontAwesomeIcon icon={faLock} />}
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="input__group">
                  <Input
                    placeholder="Confirm Password"
                    prefix={<FontAwesomeIcon icon={faLock} />}
                    id="cpassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
                <Button type="primary" block size="large" htmlType="submit">
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Signup</span>
                </Button>
              </form>

              <p>
                Already have an account? <Link to="/login">Login</Link> here
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Signup;
