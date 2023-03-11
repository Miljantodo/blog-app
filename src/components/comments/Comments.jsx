import React, { useEffect, useState } from "react";
import { fetchComments, postComment } from "../../utils/Api";
import NewComment from "../forms/newcomment/NewComment";
import OverlayModal from "../modal/OverlayModal";
import classes from "./Comments.module.css";
import Card from "../../components/card/Card";

const Comments = ({ postID }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchComments(postID).then((data) => {
      setComments(data);
    });
  }, []);

  const onSubmit = (data) => {
    postComment(data, postID)
      .then((result) => {
        setOpen(false);
        setComments([...comments, result]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderComments = () => {
    return (
      <div className={classes.body}>
        {comments.length ? (
          comments.map((comment) => (
            <Card key={comment.id} p1={comment.name} p2={comment.body} />
          ))
        ) : (
          <div className={classes.empty}>No comments for this post.</div>
        )}
        <NewComment
          postID={postID}
          comments={comments}
          setComments={setComments}
          onSubmit={onSubmit}
          open={open}
          setOpen={setOpen}
        />
      </div>
    );
  };

  return (
    <OverlayModal buttonText={"Show Comments"} className={classes.modal}>
      {renderComments()}
    </OverlayModal>
  );
};

export default Comments;
