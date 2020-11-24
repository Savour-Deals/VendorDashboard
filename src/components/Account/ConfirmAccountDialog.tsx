import React, { useState, ChangeEvent } from "react";
import { 
  TextField,
  Dialog,
  Button
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";

export const ConfirmAccountDialog: React.FC<IConfirmAccountDialog> = props => {
  const { open, redirectToLogin, confirmSignup, username, style } = props;

  const [ confirmationCode, setConfirmationCode ] = useState("");

  async function handleClose() {
    redirectToLogin();
  }

  async function handleSubmit() {
    try {
      const confirmationResult = await confirmSignup(username, confirmationCode);
      console.log(confirmationResult);
      redirectToLogin();
    } catch (error) {
      alert("Sorry, the confirmation code was incorrect");
      console.log(error);
    }
  }

  function handleConfirmationCodeChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setConfirmationCode(event.target.value);  
  }

  return <div >
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Confirmation Code</DialogTitle>
      <TextField
        label="Confirmation Code"
        type="number"
        variant="filled"
        className={style}
        onChange={handleConfirmationCodeChange}
      />
      <Button
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Dialog>
  </div>
}

