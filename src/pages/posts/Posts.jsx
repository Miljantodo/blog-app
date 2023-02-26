import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Card from "../../components/card/Card";
import Pagination from "../../components/pagination/Pagination";
import classes from "./Posts.module.css";

const POSTS_API = "https://gorest.co.in/public/v1/posts?page=";
const API_TOKEN =
  "&per_page=20?access-token=04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const Posts = () => {
  const [posts, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function pageChange(pageValue) {
    setPage(pageValue);
  }

  useEffect(() => {
    fetch(POSTS_API + page + API_TOKEN)
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.data);
        setTotalPages(result.meta.pagination.total);
      });
  }, [page]);

  const renderPosts = () => {
    if (posts.length) {
      return posts.map((post) => <Card key={post.id} {...post} />);
    } else {
      return (
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
      );
    }
  };

  return (
    <>
      {posts.length && (
        <div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onClick={pageChange}
          />
          <div className={classes.container}>{renderPosts()}</div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onClick={pageChange}
          />
        </div>
      )}
    </>
  );
};

export default Posts;
