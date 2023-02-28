import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../utils/Api";
import OverlayModal from "../modal/OverlayModal";
import classes from "./NewPost.module.css";

const NewPost = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createPost(data).then((result)=>{
      navigate("/users/702677")
    }).catch((err) => {
      console.log(err.message);
    });
  };

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
  return <OverlayModal render={renderForm} buttonText={"Create a new post."} />;
};

export default NewPost;
