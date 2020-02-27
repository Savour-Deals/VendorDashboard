import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Card } from "@material-ui/core";
import { AddVendorModal } from "./AddVendorModal";

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
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  function addVendor(vendor: Vendor) {

    setVendors([...vendors, vendor]);
  }

  function handleClose() {
    setOpen(false);
  }

  function generateVendor(vendors: Vendor[]): JSX.Element[] {
    
    return vendors.map((vendor : Vendor, index : number) => 
      <Card>
        
      </Card>
    );
    
  }

  function toggleModal() {
    setOpen(!open);
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
        onClick={toggleModal}>
          Add Vendor
        </Button>}

        <AddVendorModal
          open={open}
          handleClose={handleClose}
          addVendor={addVendor}
        />
    </div>
  );
}