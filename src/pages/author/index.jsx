import React, { useEffect } from "react";
import ProfileCard from "../../components/profileCard";
import PostItem from "../../components/postItem";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";

function Author() {
  const { username } = useParams();
  const { sendRequest, data, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", `/author/${username}`);
  }, []);

  console.log(data?.data.author);

  if (data?.data.author) {
    const { username, profilePicture, about, social, posts } = data.data.author;

    return (
      <section id="author">
        <ProfileCard profile={data.data.author} />

        <h2 className="heading">Posts by {username}</h2>

        <div className="posts__container">
          {posts.length > 0 &&
            posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </section>
    );
  }
}

export default Author;
