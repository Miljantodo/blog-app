import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postComment } from "../../../utils/Api";
import classes from "./NewComment.module.css";

const NewComment = ({ postID, comments, setComments }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

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
  return (
    <>
      {open ? (
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className={classes.body}
            type="text"
            placeholder="Comment"
            {...register("comment", { required: true })}
          />
          <input type="submit" value="Submit comment."></input>
        </form>
      ) : (
        <button
          className={classes.fixed}
          onClick={() => {
            setOpen(true);
          }}
        >
          Comment on this post.
        </button>
      )}
    </>
  );
};

export default NewComment;
