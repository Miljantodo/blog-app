import React from "react";
import { useForm } from "react-hook-form";
import OverlayModal from "../../modal/OverlayModal";
import classes from "./EditUser.module.css";

const EditUser = ({ user, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status,
    },
  });

  return (
    <OverlayModal buttonText={"Edit User"} className={classes.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true, maxLength: 80 })}
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <select {...register("gender", { required: true })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select {...register("status", { required: true })}>
          <option value="active">Active</option>
          <option value="inactive">Offline</option>
        </select>
        <input type="submit" value="Edit" />
      </form>
    </OverlayModal>
  );
};

export default EditUser;
