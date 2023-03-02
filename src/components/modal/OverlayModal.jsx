import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./OverlayModal.module.css";

const OverlayModal = ({ buttonText, children, ...props }) => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="center">
      {
        <button onClick={openModal} className={classes.button}>
          {buttonText}
        </button>
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={classes.overlay}
        {...props}
      >
        {children}
      </Modal>
    </div>
  );
};

export default OverlayModal;
