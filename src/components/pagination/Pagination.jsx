import React from "react";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
  function pageChange(i) {
    props.onClick(props.page + i);
  }
  return (
    <div className={classes.container}>
      <button
        className={props.page < 2 ? classes.hide : classes.visible}
        onClick={() => {
          pageChange(-1);
        }}
      >
        Prev Page
      </button>
      <div className={classes.currentPage}>{props.page}</div>
      <button
        className={
          props.page >= props.totalPages ? classes.hide : classes.visible
        }
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
