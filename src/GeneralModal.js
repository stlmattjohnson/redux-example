import React from "react";
import Modal from "react-bootstrap/Modal";

const GeneralModal = props => {
  let size = !props.size ? "md" : props.size;

  return (
    <Modal show={props.show} onHide={() => props.toggle()} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default GeneralModal;
