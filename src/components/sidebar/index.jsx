import React from "react";
import "./sidebar.css";
import SearchBox from "../searchBox";
import PopularPosts from "../popularPosts";
import ExploreTopics from "../exploreTopics";
import NewsLetter from "../newsletter";

function Sidebar() {
  return (
    <div className="sidebar">
      <SearchBox />
      <PopularPosts />
      <ExploreTopics />
      <NewsLetter />
    </div>
  );
}

export default Sidebar;
