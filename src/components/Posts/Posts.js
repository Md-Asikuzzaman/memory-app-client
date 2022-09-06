import React from "react";
import "./Posts.css";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = ({ setId }) => {
  const posts = useSelector((d) => d.post);

  return (
    <div className="container">
      <div className="row">
        {posts.map((post) => (
          <Post key={post._id} post={post} setId={setId} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
