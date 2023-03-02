import React, { useEffect, useState } from "react";
import { fetchComments } from "../../utils/Api";
import NewComment from "../forms/newcomment/NewComment";
import OverlayModal from "../modal/OverlayModal";
import classes from "./Comments.module.css";
import Card from "../../components/card/Card";

const Comments = (props) => {
  const [comments, setComments] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchComments(props.postID).then((data) => {
      setComments(data);
    });
    setRefresh(false);
  }, [refresh]);

  const renderComments = () => {
    return (
      <>
        {comments.length ? (
          comments.map((comments) => (
            <Card key={comments.id} p1={comments.name} p2={comments.body} />
          ))
        ) : (
          <div className={classes.empty}>No comments for this post.</div>
        )}
        <NewComment
          refresh={refresh}
          setRefresh={setRefresh}
          postID={props.postID}
        />
      </>
    );
  };

  return <OverlayModal render={renderComments} buttonText={"Show Comments"} />;
};

export default Comments;
