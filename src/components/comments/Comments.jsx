import React, { useEffect, useState } from "react";
import { fetchComments } from "../../utils/Api";
import NewComment from "../forms/newcomment/NewComment";
import OverlayModal from "../modal/OverlayModal";
import classes from "./Comments.module.css";
import Card from "../../components/card/Card";

const Comments = ({ postID }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(postID).then((data) => {
      setComments(data);
    });
  }, []);

  const renderComments = () => {
    return (
      <>
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
        />
      </>
    );
  };

  return (
    <OverlayModal buttonText={"Show Comments"} className={classes.modal}>
      {renderComments()}
    </OverlayModal>
  );
};

export default Comments;
