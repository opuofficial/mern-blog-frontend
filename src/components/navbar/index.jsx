import React from "react";
import "./navbar.css";
import { Button, Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav>
      <div className="container">
        <div className="nav__container">
          <div className="left__section">
            <div className="logo">
              <Link to="/">DevDiary</Link>
            </div>
          </div>
          <div className="right__section">
            {user ? (
              <>
                <Link to="/user/profile">
                  <div className="user__info">
                    <Avatar
                      className="avatar"
                      size="large"
                      draggable={false}
                      shape="circle"
                      src={
                        "http://localhost:5000/profile-pictures/" +
                        user.profilePicture
                      }
                    />
                    <div className="username">{user.username}</div>
                  </div>
                </Link>

                <Link to="/user/create-post">
                  <Button type="primary">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span>Write</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <span>Login</span>
                </Link>
                <Link to="/signup">
                  <span>Signup</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
