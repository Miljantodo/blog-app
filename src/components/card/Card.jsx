import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";

const Card = (props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        props.id && navigate(`./${props.id}`);
      }}
    >
      <div className={classes.container}>
        {props.p1 && <h3>{props.p1}</h3>}
        {props.p2 && <h5>{props.p2}</h5>}
        {props.p3 && <h5>{props.p3}</h5>}
        {props.p4 && <h5>{props.p4}</h5>}
      </div>
    </div>
  );
};

export default Card;
