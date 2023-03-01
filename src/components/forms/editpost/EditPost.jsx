import React from "react";
import { useForm } from "react-hook-form";
import { updatePost } from "../../../utils/Api";
import OverlayModal from "../../modal/OverlayModal";
import classes from "./EditPost.module.css";

const EditPost = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: props.post.title,
      body: props.post.body,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    updatePost(data, props.post.id).catch((err) => {
      console.log(err.message);
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
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
  return <OverlayModal render={renderForm} buttonText={"Edit Post"} />;
};

export default EditPost;
