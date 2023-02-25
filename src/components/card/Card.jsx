import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";

const Card = ({ id, name, email }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`./${id}`)}>
      <div className={classes.container}>
        <h3>Name: {name}</h3>
        <h5>Email: {email}</h5>
      </div>
    </div>
  );
};

export default Card;
