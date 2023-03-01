import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchComments, postComment } from "../../utils/Api";
import OverlayModal from "../modal/OverlayModal";
import Comment from "./comment/Comment";
import classes from "./Comments.module.css";

const Comments = (props) => {
  const [comments, setComments] = useState({});
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchComments(props.postID).then((data) => {
      setComments(data);
    });
  }, [refresh]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    postComment(data, props.postID)
      .then(() => {
        setOpen(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderComments = () => {
    if (comments.length) {
      return (
        <>
          {comments.map((comments) => (
            <Comment key={comments.id} {...comments} />
          ))}
          {open && (
            <form
              className={classes.container}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className={classes.body}
                type="text"
                placeholder="Comment"
                {...register("Comment", { required: true })}
              />
              <input type="submit" value="Submit comment."></input>
            </form>
          )}
          {!open && (
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Comment on this post.
            </button>
          )}
        </>
      );
    } else {
      return (
        <>
          <div className={classes.empty}>No comments for this post.</div>
          {open && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Comment"
                {...register("Comment", { required: true })}
              />

              <input type="submit" />
            </form>
          )}
          {!open && (
            <button
              onClick={() => {
                setOpen(true);
              }}
            >
              Comment on this post.
            </button>
          )}
        </>
      );
    }
  };

  return <OverlayModal render={renderComments} buttonText={"Show Comments"} />;
};

export default Comments;
