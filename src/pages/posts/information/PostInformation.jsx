import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import classes from "./PostInformation.module.css";
import Comments from "../../../components/comments/Comments";
import { fetchPostInfo, fetchUserInfo } from "../../../utils/Api";
import EditPost from "../../../components/forms/editpost/EditPost";

const PostInformation = () => {
  const { postID } = useParams();
  const [username, setUsername] = useState("Unknown User");
  const [email, setEmail] = useState("Unknown Email");
  const [post, setPost] = useState([]);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    fetchPostInfo(postID).then((data) => {
      setPost(data);
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
            <h3>{post.title}</h3>
            <div>{post.body}</div>
          </div>
          <br></br>
          <div className={classes.buttons}>
            <EditPost post={post} />
            <Comments postID={post.id} />
          </div>
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
