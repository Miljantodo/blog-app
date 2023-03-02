import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/card/Card";
import EditUser from "../../../components/forms/edituser/EditUser";
import { fetchUserInfo, fetchUserPosts } from "../../../utils/Api";
import classes from "./UserInformation.module.css";

const UserInformation = () => {
  const { userID } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo(userID).then((data) => {
      setUser(data);
      setValid(true);
    });
    fetchUserPosts(userID).then((data) => {
      setPosts(data);
    });
  }, [userID]);

  return valid ? (
    <>
      <Card
        className={classes.container}
        key={user.id}
        p1={user.name}
        p2={user.email}
        p3={user.gender}
        p4={user.status}
      />
      <br></br>
      <div className={classes.edit}>
        <EditUser user={user} setUser={setUser} />
      </div>
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
  ) : (
    <ThreeDots
      height="180"
      width="180"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default UserInformation;
