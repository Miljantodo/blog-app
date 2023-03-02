import React from "react";
import { useForm } from "react-hook-form";
import { updatePost } from "../../../utils/Api";
import OverlayModal from "../../modal/OverlayModal";
import classes from "./EditPost.module.css";

const EditPost = ({ post }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const onSubmit = (data) => {
    updatePost(data, post.id).catch((err) => {
      console.log(err.message);
    });
    setTimeout(function () {
      window.location.reload();
    }, 600);
  };

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
