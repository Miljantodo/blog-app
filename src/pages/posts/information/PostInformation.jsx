import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import classes from "./PostInformation.module.css";
import CommentModal from "../../../components/comments/CommentModal";

const USER_API = "https://gorest.co.in/public/v2/users/";
const POST_API = "https://gorest.co.in/public/v2/posts/";
const API_TOKEN =
  "?04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const PostInformation = () => {
  const { postID } = useParams();
  const [username, setUsername] = useState("Unknown User");
  const [email, setEmail] = useState("Unknown Email");
  const [posts, setPosts] = useState([]);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    fetch(POST_API + postID + API_TOKEN)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        fetch(USER_API + data.user_id + API_TOKEN)
          .then((result) => {
            if (result.ok) {
              return result.json();
            }
            throw new Error("User doesn't exist.");
          })
          .then((postdata) => {
            setUsername(postdata.name);
            setEmail(postdata.email);
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
