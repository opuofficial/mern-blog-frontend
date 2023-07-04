import React, { useEffect } from "react";
import "./exploreTopics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import useApi from "../../hooks/useApi.js";

import { Link } from "react-router-dom";

function Topic({ topic }) {
  return (
    <div className="topic">
      <div className="title">
        <span>
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span>
          <Link to={`/topic/${topic._id}`}>{topic.name}</Link>
        </span>
      </div>
      <div className="count">({topic.posts.length})</div>
    </div>
  );
}

function ExploreTopics() {
  const { sendRequest, data: topics, isLoading, error } = useApi();

  useEffect(() => {
    sendRequest("GET", "/topic");
  }, []);

  return (
    <div className="explore__topics">
      <h4>Explore Topics</h4>

      <div className="explore__topics__container">
        {topics?.data.length > 0 &&
          topics.data.map((topic) => <Topic key={topic._id} topic={topic} />)}
      </div>
    </div>
  );
}

export default ExploreTopics;
