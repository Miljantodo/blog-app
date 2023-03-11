import React from "react";
import { useForm } from "react-hook-form";
import classes from "./NewComment.module.css";

const NewComment = ({ onSubmit, open, setOpen }) => {
  const { register, handleSubmit } = useForm();

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
