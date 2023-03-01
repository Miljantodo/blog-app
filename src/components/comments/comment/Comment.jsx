import React from "react";
import classes from "./Comment.module.css";

const Comment = ({ body, name }) => {
  return (
    <div className={classes.container}>
      <h4>{name}</h4>
      <textarea className={classes.body}>{body}</textarea>
    </div>
  );
};

export default Comment;
