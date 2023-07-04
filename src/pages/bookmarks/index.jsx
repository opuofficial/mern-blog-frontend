import React, { useEffect } from "react";
import "./bookmarks.css";
import PostItem from "../../components/postItem";
import useApi from "../../hooks/useApi";

function Bookmarks() {
  const { sendRequest, data: posts, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", `/user/bookmarks`);
  }, []);

  if (isLoading) {
    return;
  }

  return (
    <section id="bookmarks">
      <h2 className="heading">Bookmarks</h2>

      <div className="posts__container">
        {posts?.data.length > 0 ? (
          posts.data.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <h2>You don't have any bookmarked post</h2>
        )}
      </div>
    </section>
  );
}

export default Bookmarks;
