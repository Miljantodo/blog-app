import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";

const Card = ({ id, p1, p2, p3, p4 }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        id && navigate(`./${id}`);
      }}
    >
      <div className={classes.container}>
        {p1 && <h3>{p1}</h3>}
        {p2 && <h5>{p2}</h5>}
        {p3 && <h5>{p3}</h5>}
        {p4 && <h5>{p4}</h5>}
      </div>
    </div>
  );
};

export default Card;
