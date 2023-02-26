import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";

const Card = ({ id, name, email, title }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`./${id}`)}>
      <div className={classes.container}>
        <h2>{title}</h2>
        <h3>{name}</h3>
        <h5>{email}</h5>
      </div>
    </div>
  );
};

export default Card;
