import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Pagination from "../../components/pagination/Pagination";
import { ThreeDots } from "react-loader-spinner";
import classes from "./Users.module.css";
import { fetchUsers } from "../../utils/Api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [responded, setResponded] = useState(false);

  function pageChange(pageValue) {
    setPage(pageValue);
  }

  useEffect(() => {
    fetchUsers(page).then((result) => {
      setUsers(result.data);
      setTotalPages(result.meta.pagination.total);
      setResponded(true);
    });
  }, [page]);

  const renderUsers = () => {
    return users.map((user) => (
      <Card key={user.id} id={user.id} p1={user.name} p2={user.email} />
    ));
  };

  return (
    <>
      {responded ? (
        users.length > 0 ? (
          <div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onClick={pageChange}
            />
            <div className={classes.container}>{renderUsers()}</div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onClick={pageChange}
            />
          </div>
        ) : (
          <div>No users found in the database.</div>
        )
      ) : (
        <ThreeDots className="loader" />
      )}
    </>
  );
};

export default Users;
