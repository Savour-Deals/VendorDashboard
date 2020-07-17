import { Button, Card, CardContent } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext, useCallback } from "react";
import  AddVendorModal  from "./AddVendorModal";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../../../config";
import { API } from "aws-amplify";
import { UserContext } from "../../../auth";
import {LoadingDialog} from "./LoadingDialog";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [vendors, setVendors] = useState<Array<Vendor>>([]);
  const styles = useStyles();

  const loadVendors = useCallback(async () => {
    const userName = userContext.user ? userContext.user.username : "";

    const getBusinessUserResponseData = await API.get(
      "business_users",
      "/business_users/" + userName,
      {});
      const placeIds = getBusinessUserResponseData.businesses;
      const vendors: Array<Vendor> = [];
      for (const id of placeIds) {
        const vendorResponse = await API.get("businesses", `/businesses/${id}`, {});
        const vendor: Vendor = {
          placeId: id,
          vendorName: vendorResponse.business_name,
          primaryAddress: vendorResponse.address,
          buttonId: vendorResponse.btn_id,
          onboardDeal: vendorResponse.onboard_deal,
          singleClickDeal: vendorResponse.single_click_deal,
          doubleClickDeal: vendorResponse.double_click_deal,
        }
        vendors.push(vendor);
      }

    setVendors(vendors);
    setLoading(false);
  }, [setVendors]);

  function addVendors(vendor: Vendor) {
    setVendors([...vendors, vendor]);
  }  

  useEffect(() => {
    setStripe((window as any).Stripe(config.STRIPE_KEY));
    setLoading(true);
    loadVendors();
  }, [loadVendors]);


  function handleClose() {
    setOpen(false);
  }

  function generateVendors(vendors: Vendor[]): JSX.Element[] {
    
    return vendors.map((vendor : Vendor, index : number) => 
      <Card key={vendor.placeId}>
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
      <LoadingDialog isLoading={loading}/>

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
              isLoading={loading}
            />
          </Elements>
    </div>
    </StripeProvider>

  );
}