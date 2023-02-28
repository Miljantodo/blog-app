import React from "react";
import classes from "./Comment.module.css";

const Comment = ({ body, name }) => {
  return (
    <div className={classes.container}>
      <h3>{name}</h3>
      <div>{body}</div>
    </div>
  );
};

export default Comment;
