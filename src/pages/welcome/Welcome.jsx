import React from "react";
import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={classes.container}>
      <h1>Welcome to my Blog project!</h1>
      In the upper left corner, you can navigate to a list of all users or a
      list of all posts.
    </div>
  );
};

export default Welcome;
