import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Card from "../../components/card/Card";
import NewPost from "../../components/forms/newpost/NewPost";
import Pagination from "../../components/pagination/Pagination";
import { fetchPosts, fetchUserInfo } from "../../utils/Api";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function pageChange(pageValue) {
    setPage(pageValue);
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
    });
  }, [page]);

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
      {posts.length > 0 ? (
        <div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onClick={pageChange}
          />
          <div className={classes.create}>
            <NewPost />
          </div>
          <div className={classes.container}>{renderPosts()}</div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onClick={pageChange}
          />
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

export default Posts;
