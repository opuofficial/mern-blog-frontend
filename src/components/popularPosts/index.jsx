import React, { useEffect } from "react";
import "./popularPosts.css";
import PopularPost from "../popularPost";
import useApi from "../../hooks/useApi.js";

function PopularPosts() {
  const { sendRequest, data: popularPosts, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", "/posts/popular");
  }, []);

  if (isLoading) {
    return;
  }

  if (popularPosts?.data.posts.length > 0) {
    return (
      <div className="popular__posts">
        <h4>Popular Posts</h4>

        <div className="popular__posts__container">
          {popularPosts.data.posts.map((post) => (
            <PopularPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default PopularPosts;
