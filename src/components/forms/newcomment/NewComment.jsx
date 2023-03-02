import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postComment } from "../../../utils/Api";
import classes from "./NewComment.module.css";

const NewComment = (props) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    postComment(data, props.postID)
      .then(() => {
        setOpen(false);
        props.setRefresh(!props.refresh);
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
            {...register("Comment", { required: true })}
          />
          <input type="submit" value="Submit comment."></input>
        </form>
      ) : (
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
};

export default NewComment;
