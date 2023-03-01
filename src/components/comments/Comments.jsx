import React, { useEffect, useState } from "react";
import { fetchComments } from "../../utils/Api";
import NewComment from "../forms/newcomment/NewComment";
import OverlayModal from "../modal/OverlayModal";
import Comment from "./comment/Comment";
import classes from "./Comments.module.css";

const Comments = (props) => {
  const [comments, setComments] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchComments(props.postID).then((data) => {
      setComments(data);
    });
  }, [refresh]);

  const renderComments = () => {
    if (comments.length) {
      return (
        <>
          {comments.map((comments) => (
            <Comment key={comments.id} {...comments} />
          ))}
          <NewComment
            refresh={refresh}
            setRefresh={setRefresh}
            postID={props.postID}
          />
        </>
      );
    } else {
      return (
        <>
          <div className={classes.empty}>No comments for this post.</div>
          <NewComment
            refresh={refresh}
            setRefresh={setRefresh}
            postID={props.postID}
          />
        </>
      );
    }
  };

  return <OverlayModal render={renderComments} buttonText={"Show Comments"} />;
};

export default Comments;
