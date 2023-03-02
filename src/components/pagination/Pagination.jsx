import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ page, totalPages, onClick }) => {
  function pageChange(i) {
    onClick(page + i);
  }
  return (
    <div className={classes.container}>
      <button
        className={page < 2 ? classes.hide : classes.visible}
        onClick={() => {
          pageChange(-1);
        }}
      >
        Prev Page
      </button>
      <div className={classes.pages}>
        <div className={classes.currentPage}>{page}</div>. . .
        <div className={classes.currentPage}>{totalPages}</div>
      </div>
      <button
        className={page >= totalPages ? classes.hide : classes.visible}
        onClick={() => {
          pageChange(1);
        }}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
