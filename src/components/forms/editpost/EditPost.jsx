import React from "react";
import { useForm } from "react-hook-form";
import OverlayModal from "../../modal/OverlayModal";
import classes from "./EditPost.module.css";

const EditPost = ({ post, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <textarea
          className={classes.title}
          type="textarea"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <textarea
          className={classes.body}
          type="textarea"
          placeholder="Text Body"
          {...register("body", { required: true })}
        />
        <button type="submit">Edit post</button>
      </form>
    );
  };
  return (
    <OverlayModal buttonText={"Edit Post"} className={classes.modal}>
      {renderForm()}
    </OverlayModal>
  );
};

export default EditPost;
