import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import ViewStudentForm from "./ViewStudentForm";

export default function ViewPatientModal({ patient }) {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    if (success) window.location.reload();
  };

  return (
    <>
      <Button color="primary" size="sm" onClick={toggle}>
        View
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className=""
        backdrop={true}
        size="lg"
      >
        <ModalHeader toggle={toggle}>View Student</ModalHeader>
        <ModalBody>
          <ViewStudentForm
            patient={patient}
            toggle={toggle}
            setSuccess={setSuccess}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
