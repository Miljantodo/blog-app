import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import classes from "./PostInformation.module.css";
import CommentModal from "../../../components/comments/CommentModal";
import { fetchPostInfo, fetchUserInfo } from "../../../utils/Api";

const PostInformation = () => {
  const { postID } = useParams();
  const [username, setUsername] = useState("Unknown User");
  const [email, setEmail] = useState("Unknown Email");
  const [posts, setPosts] = useState([]);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    fetchPostInfo(postID).then((data) => {
      setPosts(data);
      fetchUserInfo(data.user_id)
        .then((result) => {
          setUsername(result.name);
          setEmail(result.email);
          setValid(true);
        })
        .catch((error) => {
          setValid(true);
        });
    });
  }, []);

  return (
    <>
      {valid ? (
        <div>
          <div className={classes.container}>
            <div>Name: {username}</div>
            <div>Email: {email}</div>
            <h3>{posts.title}</h3>
            <div>{posts.body}</div>
          </div>
          <br></br>
          <CommentModal postID={posts.id} />
        </div>
      ) : (
        <ThreeDots
          height="360"
          width="360"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </>
  );
};

export default PostInformation;
