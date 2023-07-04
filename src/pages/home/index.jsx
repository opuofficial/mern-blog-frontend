import React, { useEffect } from "react";
import "./home.css";
import PostItem from "../../components/postItem";

import useApi from "../../hooks/useApi";

function Home() {
  const { sendRequest, data: posts, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", "/posts");
  }, []);

  return (
    <section id="home">
      <h2 className="heading">Latest Posts</h2>

      <div className="posts__container">
        {posts?.data.length > 0 &&
          posts.data.map((post) => <PostItem key={post._id} post={post} />)}
      </div>
    </section>
  );
}

export default Home;
