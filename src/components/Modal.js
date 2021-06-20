import React from "react";
import { Modal, Button } from "react-bootstrap";
const Bmodal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="bg-danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Bmodal;
