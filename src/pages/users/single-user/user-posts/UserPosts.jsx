import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UserPosts.module.css";

const UserPosts = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.mini_container}>
      Posts:
      {posts.length ? (
        posts.map((post) => (
          <button
            className={classes.posts}
            key={post.id}
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
          >
            {post.title}
          </button>
        ))
      ) : (
        <div>User has no posts.</div>
      )}
    </div>
  );
};

export default UserPosts;
