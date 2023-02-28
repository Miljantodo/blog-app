import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Comment from "./comment/Comment";
import classes from "./CommentModal.module.css";

const COMMENT_API = "https://gorest.co.in/public/v2/posts/";
const API_TOKEN =
  "/comments?04159bae6146ff65c3e788a48f50985a1dcaa8bac77de4988132ad5ca8a2bc30";

const CommentModal = (props) => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch(COMMENT_API + props.postID + API_TOKEN)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        console.log(data);
      });
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const renderComments = () => {
    if (comments.length) {
      return comments.map((comments) => (
        <Comment key={comments.id} {...comments} />
      ));
    } else {
      return <div className={classes.empty}>No comments for this post.</div>;
    }
  };

  return (
    <div>
      <button onClick={openModal} className={classes.button}>
        Comments
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={classes.modal}
        overlayClassName={classes.overlay}
      >
        <div>{renderComments()}</div>
      </Modal>
    </div>
  );
};

export default CommentModal;
