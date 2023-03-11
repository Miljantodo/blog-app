import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import NewPost from "../../components/forms/newpost/NewPost";
import Pagination from "../../components/pagination/Pagination";
import { createPost, fetchPosts, fetchUserInfo } from "../../utils/Api";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [responded, setResponded] = useState(false);
  const navigate = useNavigate();

  function pageChange(pageValue) {
    setPage(pageValue);
    setResponded(false);
    setPosts([]);
  }

  useEffect(() => {
    fetchPosts(page).then(async (result) => {
      const postsWithUsers = await Promise.all(
        result.data.map(async (post) => {
          const username = await findAuthorName(post.user_id);

          return { ...post, username };
        })
      );

      setPosts(postsWithUsers);
      setTotalPages(result.meta.pagination.total);
      setResponded(true);
    });
  }, [page]);

  const onSubmit = (data) => {
    createPost(data)
      .then(() => {
        navigate("/users/702677");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const findAuthorName = (userID) => {
    return fetchUserInfo(userID)
      .then((result) => {
        return result.name;
      })
      .catch((error) => {
        console.log("API is missing users referenced above.");
        return "Unknown User";
      });
  };

  const renderPosts = () => {
    if (posts.length) {
      return posts.map((post) => (
        <Card key={post.id} id={post.id} p1={post.title} p2={post.username} />
      ));
    }
  };

  return (
    <>
      {responded ? (
        posts.length > 0 ? (
          <div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onClick={pageChange}
            />
            <div className={classes.create}>
              <NewPost onSubmit={onSubmit} />
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
