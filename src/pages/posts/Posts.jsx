import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Card from "../../components/card/Card";
import NewPost from "../../components/forms/newpost/NewPost";
import Pagination from "../../components/pagination/Pagination";
import { fetchPosts } from "../../utils/Api";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function pageChange(pageValue) {
    setPage(pageValue);
  }

  useEffect(() => {
    fetchPosts(page).then((result) => {
      setPosts(result.data);
      setTotalPages(result.meta.pagination.total);
    });
  }, [page]);

  const renderPosts = () => {
    if (posts.length) {
      return posts.map((post) => <Card key={post.id} {...post} />);
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

export default Posts;
