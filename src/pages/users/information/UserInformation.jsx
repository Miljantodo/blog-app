import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./UserInformation.module.css";

const USER_API = "https://gorest.co.in/public/v2/users/";
const API_TOKEN =
  "?04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const UserInformation = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(USER_API + userID + API_TOKEN)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    fetch(USER_API + userID + "/posts" + API_TOKEN)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Gender: {user.gender}</div>
        <div>Status: {user.status}</div>
      </div>
      <br></br>
      <div className={classes.mini_container}>
        Posts:
        {posts.length ? (
          posts.map((post) => <div key={post.id}>{post.title}</div>)
        ) : (
          <div>User has no posts.</div>
        )}
      </div>
    </>
  );
};

export default UserInformation;
