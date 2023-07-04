import React, { useEffect, useState } from "react";
import "./postItem.css";
import { Col, Row } from "antd";
import bookmarkRegular from "../../assets/bookmark-regular.svg";
import bookmarkSolid from "../../assets/bookmark-solid.svg";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi.js";

function PostItem({ post }) {
  const { user } = useSelector((state) => state.auth);
  const { _id, title, thumbnail, topic, author, createdAt } = post;
  const { sendRequest, data, isLoading, error } = useApi();

  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    if (user) {
      const isBookmarked = user.bookmarks.includes(_id);
      setBookmark(isBookmarked);
    }
  }, []);

  const toggleBookmark = () => {
    sendRequest("POST", "/user/bookmark/add-remove", { postId: _id });
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const { bookmark: updateBookmark, message } = data?.data || {};
    console.log(updateBookmark);

    setBookmark(updateBookmark);
  }, [data]);

  // const { bookmark: updateBookmark, message } = data?.data || {};

  return (
    <div className="post__item">
      <Row gutter={[20, 20]}>
        <Col lg={{ span: 9 }} xs={{ span: 24 }}>
          <Link to={`/post/${_id}`}>
            <div className="post__thumbnail">
              <img
                src={"http://localhost:5000/post-thumbnails/" + thumbnail}
                alt=""
              />
            </div>
          </Link>
        </Col>
        <Col lg={{ span: 15 }} xs={{ span: 24 }}>
          <div className="post__info">
            <div className="post__header">
              <div className="topic">{topic.name}</div>
              <div className="date">
                {moment(createdAt).format("D MMMM, YYYY")}
              </div>
            </div>

            <Link to={`/post/${_id}`}>
              <div className="post__title">{title}</div>
            </Link>

            <div className="post__footer">
              <Link to={`/author/${author.username}`}>
                <div className="author__info">
                  <img
                    src={
                      "http://localhost:5000/profile-pictures/" +
                      author.profilePicture
                    }
                    alt=""
                  />
                  <div className="author__name">{author.username}</div>
                </div>
              </Link>

              {user && (
                <div className="bookmark__icon" onClick={toggleBookmark}>
                  <img
                    src={bookmark ? bookmarkSolid : bookmarkRegular}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PostItem;
