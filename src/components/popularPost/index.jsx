import React from "react";
import "./popularPost.css";
import moment from "moment";
import { Link } from "react-router-dom";

function PopularPost({ post }) {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="popular__post">
        <div className="thumbnail">
          <img
            src={"http://localhost:5000/post-thumbnails/" + post.thumbnail}
            alt=""
          />
        </div>
        <div className="post__info">
          <div className="title">{post.title}</div>
          <div className="date">
            {moment(post.createdAt).format("D MMMM, YYYY")}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PopularPost;
