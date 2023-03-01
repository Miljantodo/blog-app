import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditUser from "../../../components/forms/edituser/EditUser";
import { fetchUserInfo, fetchUserPosts } from "../../../utils/Api";
import classes from "./UserInformation.module.css";

const UserInformation = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

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
      {ready && (
        <div className={classes.edit}>
          <EditUser user={user} />
        </div>
      )}
      <br></br>
      <div className={classes.mini_container}>
        Posts:
        {posts.length ? (
          posts.map((post) => (
            <button
              className={classes.posts}
              key={post.id}
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
            >
              {post.title}
            </button>
          ))
        ) : (
          <div>User has no posts.</div>
        )}
      </div>
    </>
  );
};

export default UserInformation;
