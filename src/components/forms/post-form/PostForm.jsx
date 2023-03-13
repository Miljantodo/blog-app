import React from "react";
import { useForm } from "react-hook-form";
import OverlayModal from "../../modal/OverlayModal";
import classes from "./PostForm.module.css";

const PostForm = ({ post, onSubmit, buttonText }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
    },
  });

  return (
    <OverlayModal buttonText={buttonText} className={classes.modal}>
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
        <button type="submit">Save</button>
      </form>
    </OverlayModal>
  );
};

export default PostForm;
