import React from "react";
import { Dialog } from "@material-ui/core";
import Loader from "react-loader-spinner";

export const LoadingDialog: React.FC<LoadingDialogProps> = props => {
  const { isLoading } = props;
  return (
    <Dialog open={isLoading}>
    <Loader type="ThreeDots" color="#49ABAA" height={100} width={100}/>
  </Dialog>
  );
}