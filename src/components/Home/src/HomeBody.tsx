import { Button, Card, CardContent } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from "react";
import  AddVendorModal  from "./AddVendorModal";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../../../config";
import { API } from "aws-amplify";
import { AuthContext } from "../../../auth";

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
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const styles = useStyles();

  const authInfo = useContext(AuthContext);
  const userName = authInfo.user.username;
  API.get(
    "business_users",
    `/business_users/${userName}`,
    {}
  )
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })

  useEffect(() => {
    setStripe((window as any).Stripe(config.STRIPE_KEY));
  }, [])

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
    <StripeProvider stripe={stripe}>

    <div className={styles.root}>

        {(vendors.length > 0) 
        ? generateVendors(vendors)
        : <Button 
          variant="contained"   
          className={styles.button} 
          onClick={toggleModal}>
            Add Vendor
          </Button>}
          <Elements>
            <AddVendorModal
              open={open}
              handleClose={handleClose}
              addVendor={addVendor}
              isLoading={isLoading}
            />
          </Elements>
    </div>
    </StripeProvider>

  );
}