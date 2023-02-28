import React, { useEffect, useState } from "react";
import { fetchComments } from "../../utils/Api";
import OverlayModal from "../modal/OverlayModal";
import Comment from "./comment/Comment";
import classes from "./Comments.module.css";

const CommentModal = (props) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchComments(props.postID).then((data) => {
      setComments(data);
    });
  }, []);

  const renderComments = () => {
    if (comments.length) {
      return <>
      {comments.map((comments) => (
        <Comment key={comments.id} {...comments} />
      ))}
      <button>Comment on this post.</button></>
    } else {
      return <><div className={classes.empty}>No comments for this post.</div><button>Comment on this post.</button></>;
    }
  };

  return <OverlayModal render={renderComments} buttonText={"Show Comments"} />;
};

export default CommentModal;
