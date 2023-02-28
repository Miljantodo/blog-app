import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./OverlayModal.module.css";

const OverlayModal = (props) => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {
        <button onClick={openModal} className={classes.button}>
          {props.buttonText}
        </button>
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={classes.modal}
        overlayClassName={classes.overlay}
      >
        <div>{props.render()}</div>
      </Modal>
    </div>
  );
};

export default OverlayModal;
