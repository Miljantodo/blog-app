import React from "react";
import { useForm } from "react-hook-form";
import OverlayModal from "../../modal/OverlayModal";
import classes from "./NewPost.module.css";

const NewPost = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <input
          className={classes.title}
          type="text"
          placeholder="Title"
          {...register("Title", { required: true })}
        />
        <textarea
          className={classes.body}
          type="textarea"
          placeholder="Text Body"
          {...register("Body", { required: true })}
        />
        <button type="submit">Submit post</button>
      </form>
    );
  };
  return (
    <OverlayModal className={classes.modal} buttonText={"Create a new post."}>
      {renderForm()}
    </OverlayModal>
  );
};

export default NewPost;
