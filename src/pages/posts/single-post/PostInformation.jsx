import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import classes from "./PostInformation.module.css";
import Comments from "../../../components/comments/Comments";
import { fetchPostInfo, fetchUserInfo } from "../../../utils/Api";
import EditPost from "../../../components/forms/editpost/EditPost";
import Card from "../../../components/card/Card";

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
          <Card
            className={classes.container}
            key={post.id}
            p1={username}
            p2={email}
            p3={post.title}
            p4={post.body}
          />
          <br></br>
          <div className={classes.buttons}>
            <EditPost post={post} setPost={setPost} />
            <Comments postID={post.id} />
          </div>
        </div>
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
      )}
    </>
  );
};

export default PostInformation;
