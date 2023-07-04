import React, { useEffect } from "react";
import "./profile.css";
import { Button, Divider } from "antd";
import ProfileCard from "../../components/profileCard";
import PostItem from "../../components/postItem";
import { Link } from "react-router-dom";

import useApi from "../../hooks/useApi.js";

function Profile() {
  const { sendRequest, data, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", "/user/profile");
  }, []);

  if (isLoading) {
    return;
  }

  const { username, profilePicture, about, socialLinks: social } = data.data;

  const profile = { username, profilePicture, about, social };

  return (
    <section id="profile">
      <h2 className="heading">Profile</h2>

      <div className="profile__info">
        <ProfileCard profile={profile} />

        <Divider orientation="left">
          <Link to="/user/edit-profile">
            <Button type="primary" className="edit__button">
              Edit Profile
            </Button>
          </Link>
        </Divider>
      </div>

      <div className="my__posts__container">
        <h2 className="heading">My Posts</h2>
        {data.data.posts.length > 0 && (
          <div className="posts__container">
            {data.data.posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
