import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Card from "../../../components/card/Card";
import EditUser from "../../../components/forms/edit-user/EditUser";
import { fetchUserInfo, fetchUserPosts, updateUser } from "../../../utils/Api";
import classes from "./SingleUser.module.css";
import UserPosts from "./user-posts/UserPosts";

const SingleUser = () => {
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchUserInfo(userID).then((data) => {
      setUser(data);
      setDataFetched(true);
    });
    fetchUserPosts(userID).then((data) => {
      setPosts(data);
    });
  }, [userID]);

  const onSubmit = (data) => {
    updateUser(data, user.id)
      .then((result) => {
        setUser(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return dataFetched ? (
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
        <EditUser user={user} setUser={setUser} onSubmit={onSubmit} />
      </div>
      <br></br>
      <UserPosts posts={posts} />
    </>
  ) : (
    <ThreeDots height="180" className="loader" />
  );
};

export default SingleUser;
