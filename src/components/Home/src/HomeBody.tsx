import { Button, Card, CardContent } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from "react";
import  AddVendorModal  from "./AddVendorModal";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../../../config";
import { API } from "aws-amplify";
import { UserContext } from "../../../auth";

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
  const userContext: IUserContext = useContext(UserContext);
  console.log(userContext);
  
  const addVendors = userContext.addVendor;
  const vendors = 'vendors' in userContext.data ? userContext.data.vendors: [];
  
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const styles = useStyles();

  console.log(vendors);

  useEffect(() => {
    setStripe((window as any).Stripe(config.STRIPE_KEY));


  }, []);


  function handleClose() {
    setOpen(false);
  }

  function generateVendors(vendors: Vendor[]): JSX.Element[] {
    
    return vendors.map((vendor : Vendor, index : number) => 
      <Card>
        <CardContent>
          {vendor.vendorName}
        </CardContent>
      </Card>
    );
    
  }

  function toggleModal() {
    setOpen(!open);
  }

  return ( 
    <StripeProvider stripe={stripe}>

    <div className={styles.root}>
        <div>
        {generateVendors(vendors)}
        </div>

        <Button 
          variant="contained"   
          className={styles.button} 
          onClick={toggleModal}>
            Add Vendor
          </Button>
          <Elements>
            <AddVendorModal
              open={open}
              handleClose={handleClose}
              addVendor={addVendors}
              isLoading={isLoading}
            />
          </Elements>
    </div>
    </StripeProvider>

  );
}