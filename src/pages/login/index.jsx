import React, { useEffect, useState } from "react";
import "./login.css";
import { Button, Col, Row } from "antd";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const { emailOrUsername, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      emailOrUsername,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <section id="login">
      <div className="container">
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 18, offset: 3 }}
            md={{ span: 14, offset: 5 }}
            lg={{ span: 10, offset: 7 }}
          >
            <div className="login__form">
              <h3>Welcome Back!</h3>

              <form onSubmit={onSubmit}>
                <div className="input__group">
                  <Input
                    placeholder="Username"
                    prefix={<FontAwesomeIcon icon={faUser} />}
                    id="emailOrUsername"
                    type="text"
                    name="emailOrUsername"
                    value={emailOrUsername}
                    onChange={onChange}
                  />
                </div>
                <div className="input__group">
                  <Input
                    placeholder="Password"
                    prefix={<FontAwesomeIcon icon={faLock} />}
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <Button type="primary" block size="large" htmlType="submit">
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>Login</span>
                </Button>
              </form>

              <p>
                Don't have an account? <Link to="/signup">Signup</Link> here
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Login;
