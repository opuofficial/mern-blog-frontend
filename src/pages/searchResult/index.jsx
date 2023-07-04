import React, { useEffect } from "react";
import "./searchResult.css";

import PostItem from "../../components/postItem";

import { useSearchParams } from "react-router-dom";
import useApi from "../../hooks/useApi";

function SearchResult() {
  const { sendRequest, data: posts, isLoading, error } = useApi();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    sendRequest("GET", `/posts/search?query=${searchQuery}`);
  }, [searchQuery]);

  if (isLoading) {
    return;
  }

  if (posts.data.results.length == 0) {
    return <h2>No result found for "{searchQuery}"</h2>;
  }

  return (
    <section id="search__result">
      <h2>Search result for "{searchQuery}"</h2>

      <div className="posts__container">
        {posts.data.results.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default SearchResult;
