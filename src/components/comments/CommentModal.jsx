import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchComments } from "../../utils/Api";
import Comment from "./comment/Comment";
import classes from "./CommentModal.module.css";

const CommentModal = (props) => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchComments(props.postID).then((data) => {
      setComments(data);
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
