import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1)
    },

    img: {
      maxWidth:"15%",
      height:"auto",
      
  },
  button: {
    backgroundColor: "#49ABAA",
    color: "white",
    margin: theme.spacing(2),
  },
  }),
);



export const HomeBody: React.FC = () => {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  function handleAddVendor() {
    setVendors([]);
  }

  function handleClose() {
    setOpen(false);
  }

  function renderVendors(vendors: Vendor[]): JSX.Element[] {
    const renderedVendors: JSX.Element[] = [];

    for (let i = 0; i < vendors.length; i++) {
      renderedVendors.push(
        <h1>Vendor {i}</h1>
      );
    }

    return renderedVendors;
  }


  return ( 
    <div className={styles.root}>
      {(vendors.length > 0) 
      ? renderVendors(vendors)
      : <Button 
        variant="contained" 
        className={styles.button} 
        onClick={handleAddVendor}>
          Add Vendor
        </Button>}
    </div>
  );
}