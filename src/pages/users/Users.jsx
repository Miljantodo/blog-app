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

  function pageChange(pageValue) {
    setPage(pageValue);
  }

  useEffect(() => {
    fetchUsers(page).then((result) => {
      setUsers(result.data);
      setTotalPages(result.meta.pagination.total);
    });
  }, [page]);

  const renderUsers = () => {
    if (users.length) {
      return users.map((user) => <Card key={user.id} {...user} />);
    }
  };

  return (
    <>
      {users.length > 0 ? (
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

export default Users;
