import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import classes from "./SinglePost.module.css";
import Comments from "../../../components/comments/Comments";
import { fetchPostInfo, fetchUserInfo, updatePost } from "../../../utils/Api";
import EditPost from "../../../components/forms/editpost/EditPost";
import Card from "../../../components/card/Card";

const SinglePost = () => {
  const { postID } = useParams();
  const [username, setUsername] = useState("Unknown User");
  const [email, setEmail] = useState("Unknown Email");
  const [post, setPost] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchPostInfo(postID).then((data) => {
      setPost(data);
      fetchUserInfo(data.user_id)
        .then((result) => {
          setUsername(result.name);
          setEmail(result.email);
          setDataFetched(true);
        })
        .catch((error) => {
          setDataFetched(true);
        });
    });
  }, []);

  const onSubmit = (data) => {
    updatePost(data, post.id)
      .then((result) => {
        setPost(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {dataFetched ? (
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
            <EditPost post={post} setPost={setPost} onSubmit={onSubmit} />
            <Comments postID={post.id} />
          </div>
        </div>
      ) : (
        <ThreeDots className="loader" />
      )}
    </>
  );
};

export default SinglePost;
