import React, { useState } from "react";
import { Modal } from "@material-ui/core";



export const AddVendorModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <h1>
        
      </h1>
    </Modal>
  );
}