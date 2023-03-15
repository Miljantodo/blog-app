import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import PostForm from "../../components/forms/post-form/PostForm";
import Pagination from "../../components/pagination/Pagination";
import { createPost, fetchPosts, fetchUserInfo } from "../../utils/Api";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  function pageChange(pageValue) {
    setPage(pageValue);
    setPosts([]);
    setDataFetched(false);
  }

  useEffect(() => {
    fetchPosts(page)
      .then(async (result) => {
        const postsWithUsers = await Promise.all(
          result.data.map(async (post) => {
            const username = await findAuthorName(post.user_id);
            return { ...post, username };
          })
        );
        setPosts(postsWithUsers);
        setTotalPages(result.meta.pagination.total);
        setDataFetched(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page]);

  const onSubmit = (data) => {
    createPost(data)
      .then(() => {
        navigate("/users/10226");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const findAuthorName = async (userID) => {
    return await fetchUserInfo(userID)
      .then((result) => {
        return result.name;
      })
      .catch(() => {
        console.log("API is missing users referenced above.");
        return "Unknown User";
      });
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <Card key={post.id} id={post.id} p1={post.title} p2={post.username} />
    ));
  };

  return (
    <>
      {dataFetched ? (
        posts.length > 0 ? (
          <div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onClick={pageChange}
            />
            <div className={classes.create}>
              <PostForm onSubmit={onSubmit} buttonText="Create Post" />
            </div>
            <div className={classes.container}>{renderPosts()}</div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onClick={pageChange}
            />
          </div>
        ) : (
          <div>No posts found in the database.</div>
        )
      ) : (
        <ThreeDots className="loader" />
      )}
    </>
  );
};

export default Posts;
