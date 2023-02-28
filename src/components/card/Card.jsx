import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../utils/Api";
import classes from "./Card.module.css";

const Card = ({ id, user_id, name, email, title }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Unknown User");

  useEffect(() => {
    findName(user_id);
  }, []);

  function findName(userID) {
    if (user_id) {
      fetchUserInfo(userID)
        .then((result) => {
          setUsername(result.name);
        })
        .catch((error) => {
          console.log("API is missing users referenced above.");
        });
    }
  }

  return (
    <div onClick={() => navigate(`./${id}`)}>
      <div className={classes.container}>
        {title && <h3>{title}</h3>}
        {title && <h5>Author: {username}</h5>}
        {name && <h3>Name: {name}</h3>}
        {name && <h5>Email: {email}</h5>}
      </div>
    </div>
  );
};

export default Card;
