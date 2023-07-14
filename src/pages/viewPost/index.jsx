import React, { useEffect, useState } from "react";

import { Button, Divider } from "antd";
import "./viewPost.css";

import { useParams } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function removeScriptTags(html) {
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const sanitizedHTML = html.replace(scriptRegex, "");
  return { __html: sanitizedHTML };
}

function ViewPost() {
  const { postId } = useParams();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { sendRequest, data: post, isLoading, error } = useApi();
  const { sendRequest: sendRequest2, data } = useApi();
  const { sendRequest: sendRequest3, data: data2 } = useApi();
  const { sendRequest: sendRequest4, data: data3 } = useApi();

  const [likes, setLikes] = useState(null);
  const [disLikes, setDisLikes] = useState(null);

  useEffect(() => {
    sendRequest("GET", `/posts/${postId}`);
  }, [postId]);

  useEffect(() => {
    if (post) {
      // console.log(post.data);
      const likesOnThisPost = post.data.likes.length;
      const dislikesOnThisPost = post.data.dislikes.length;

      setLikes(likesOnThisPost);
      setDisLikes(dislikesOnThisPost);
    }
  }, [post]);

  // console.log(post?.data);

  const likePost = () => {
    sendRequest2("PUT", `/posts/${postId}/like`);
  };

  const dislikePost = () => {
    sendRequest3("PUT", `/posts/${postId}/dislike`);
  };

  const deletePost = () => {
    sendRequest4("DELETE", `/posts/${postId}/delete`);
  };

  useEffect(() => {
    if (data2) {
      const { totalLikes, totalDislikes } = data2.data;

      setLikes(totalLikes);
      setDisLikes(totalDislikes);
    }
  }, [data2]);

  useEffect(() => {
    if (data) {
      const { totalLikes, totalDislikes } = data.data;

      setLikes(totalLikes);
      setDisLikes(totalDislikes);
    }
  }, [data]);

  useEffect(() => {
    if (data3) {
      toast.success(data3.data.message);
      navigate("/");
    }
  }, [data3]);

  if (isLoading) {
    return "Loading...";
  }

  const { _id, title, thumbnail, content, topic, author, createdAt } =
    post.data;

  const sanitizedHTML = removeScriptTags(content);

  // console.log(post.data);

  return (
    <section id="view__post">
      <h1 className="post__title">{title}</h1>
      <div className="post__info__container">
        <div className="post__info">
          <Link to={`/author/${author.username}`}>
            <span>
              <img
                src={
                  "http://localhost:5000/profile-pictures/" +
                  author.profilePicture
                }
                alt=""
              />
              {author.username}
            </span>
          </Link>{" "}
          <span className="topic">{topic.name}</span>
          <span className="date">
            {moment(createdAt).format("D MMMM, YYYY")}
          </span>
        </div>

        {author._id == user?.id && (
          <Button type="primary" danger onClick={deletePost}>
            Delete
          </Button>
        )}
      </div>
      <div className="post__body">
        <div className="post__thumbnail">
          <img
            src={"http://localhost:5000/post-thumbnails/" + thumbnail}
            alt=""
          />
        </div>
        <div
          className="post__content"
          dangerouslySetInnerHTML={sanitizedHTML}
        />
      </div>

      <Divider />

      <div className="button__group">
        <Button disabled={!isLoggedIn} onClick={likePost}>
          Like ({likes})
        </Button>
        <Button disabled={!isLoggedIn} onClick={dislikePost}>
          Dislike ({disLikes})
        </Button>
      </div>
    </section>
  );
}

export default ViewPost;
