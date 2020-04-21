import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Card, CardContent } from "@material-ui/core";
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

  function generateVendors(vendors: Vendor[]): JSX.Element[] {
    
    return vendors.map((vendor : Vendor, index : number) => 
      <Card>
        <CardContent>
          
        </CardContent>
      </Card>
    );
    
  }

  function toggleModal() {
    setOpen(!open);
  }

  return ( 
    <div className={styles.root}>
      {(vendors.length > 0) 
      ? generateVendors(vendors)
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