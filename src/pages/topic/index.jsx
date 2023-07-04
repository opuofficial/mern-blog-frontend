import React, { useEffect } from "react";
import PostItem from "../../components/postItem";
import "./topic.css";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";

function Topic() {
  const { topicId } = useParams();
  const { sendRequest, data: posts, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", `/topic/${topicId}/posts`);
  }, [topicId]);

  if (isLoading) {
    return "Loading...";
  }

  const topicName = posts.data.topic.name;

  if (posts.data.posts.length == 0) {
    return <h2>No post found in {topicName}</h2>;
  }

  return (
    <section id="topic__posts">
      <h2>{topicName} related posts</h2>

      <div className="posts__container">
        {posts.data.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default Topic;
