import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditUser from "../../../components/forms/edituser/EditUser";
import { fetchUserInfo, fetchUserPosts } from "../../../utils/Api";
import classes from "./UserInformation.module.css";

const UserInformation = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchUserInfo(userID).then((data) => {
      setUser(data);
      setReady(true);
    });
    fetchUserPosts(userID).then((data) => {
      setPosts(data);
    });
  }, [userID]);

  return (
    <>
      <div className={classes.container}>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Gender: {user.gender}</div>
        <div>Status: {user.status}</div>
      </div>
      <br></br>
      {ready && <EditUser user={user} />}
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
