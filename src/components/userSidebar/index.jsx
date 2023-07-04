import React from "react";
import "./userSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faLock,
  faPenToSquare,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { reset, logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const sidebarItems = [
  {
    id: uuidv4(),
    icon: faUser,
    title: "Profile",
    path: "profile",
  },
  {
    id: uuidv4(),
    icon: faPenToSquare,
    title: "Create Post",
    path: "create-post",
  },
  {
    id: uuidv4(),
    icon: faBookmark,
    title: "Bookmarks",
    path: "bookmarks",
  },
  {
    id: uuidv4(),
    icon: faLock,
    title: "Change Password",
    path: "change-password",
  },
];

function UserSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="user__sidebar">
      {sidebarItems.map((item) => (
        <NavLink to={item.path} key={item.id}>
          <div className="sidebar__item">
            <div className="icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className="title">{item.title}</div>
          </div>
        </NavLink>
      ))}

      <div className="sidebar__item logout" onClick={onLogout}>
        <div className="icon">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
        <div className="title">Logout</div>
      </div>
    </div>
  );
}

export default UserSidebar;
