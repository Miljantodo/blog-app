import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Card from "../../components/card/Card";

const USERS_API = "https://gorest.co.in/public/v2/users?page=";
const API_TOKEN =
  "&per_page=30?access-token=04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(USERS_API + page + API_TOKEN)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
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
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next Page
      </button>
      <div>{renderUsers()}</div>
    </>
  );
};

export default Users;
