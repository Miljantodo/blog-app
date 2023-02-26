import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";

const Card = ({ id, user_id, name, email, title }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`./${id}`)}>
      <div className={classes.container}>
        {title && <h3>Title: {title}</h3>}
        {title && <h5>Author ID: {user_id}</h5>}
        {name && <h3>Name: {name}</h3>}
        {name && <h5>Email: {email}</h5>}
      </div>
    </div>
  );
};

export default Card;
