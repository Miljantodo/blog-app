import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Card.module.css";

const USER_API = "https://gorest.co.in/public/v2/users/";
const API_TOKEN =
  "?04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const Card = ({ id, user_id, name, email, title }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Unknown");

  useEffect(() => {
    findName(user_id);
  }, []);

  function findName(userid) {
    if (user_id) {
      fetch(USER_API + userid + API_TOKEN)
        .then((result) => {
          if (result.ok) {
            return result.json();
          }
          throw new Error("User doesn't exist.");
        })
        .then((postdata) => {
          setUsername(postdata.name);
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
