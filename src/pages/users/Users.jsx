import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Card from "../../components/card/Card";
import Pagination from "../../components/pagination/Pagination";
import classes from "./Users.module.css";

const USERS_API = "https://gorest.co.in/public/v1/users?page=";
const API_TOKEN =
  "&per_page=30?access-token=04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function pageChange(pageValue) {
    setPage(pageValue);
  }

  useEffect(() => {
    fetch(USERS_API + page + API_TOKEN)
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.data);
        setTotalPages(result.meta.pagination.total);
      });
  }, [page]);

  const renderUsers = () => {
    if (users.length) {
      return users.map((user) => <Card key={user.id} {...user} />);
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
      <Pagination page={page} totalPages={totalPages} onClick={pageChange} />
      <div className={classes.container}>{renderUsers()}</div>
      <Pagination page={page} totalPages={totalPages} onClick={pageChange} />
    </>
  );
};

export default Users;
