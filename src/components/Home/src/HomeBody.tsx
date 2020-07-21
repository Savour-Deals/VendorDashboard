import { Button, Card, CardContent, CardHeader, Grid, IconButton, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext, useCallback } from "react";
import  AddVendorModal  from "./AddVendorModal";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../../../config";
import { API } from "aws-amplify";
import { UserContext } from "../../../auth";
import { LoadingDialog } from "./LoadingDialog";
import EditIcon from "@material-ui/icons/Edit";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      textAlign: "center",
      alignItems: "center",
      alignContent: "center   "
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

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

export const HomeBody: React.FC = () => {
  const userContext: IUserContext = useContext(UserContext);
  const loaded = React.useRef(false);
  
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
      <Grid key={vendor.placeId} item xs={4} >
        <Card>
          <CardHeader
            title={vendor.vendorName}
            subheader={vendor.primaryAddress}
            action={
              <IconButton>
                <EditIcon/>
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={3}> 
              <Grid item xs={4}>
                Onboard Deal: {vendor.onboardDeal}
              </Grid>
              <Grid item xs={4}>
                Single Click Deal: {vendor.singleClickDeal}
              </Grid>
              <Grid item xs={4}>
                Double Click Deal: {vendor.doubleClickDeal}
              </Grid>
              <Grid item container xs={4}>
                Current Subscribers:
                { vendor.subscribers ? Object.keys(vendor.subscribers).map((key: string, index: number) =>{
                  return (
                    <Grid item xs={4} key={index}>
                      {vendor.subscribers!}
                    </Grid>
                  )
                }) : null}
              </Grid>
            </Grid>
            
          </CardContent>
        </Card>
      </Grid>
    );
    
  }

  function toggleModal() {
    setOpen(!open);
  }

  return ( 
    <StripeProvider stripe={stripe}>

    <div className={styles.root}>
      <LoadingDialog isLoading={loading}/>

        <Grid container spacing={4} direction="column" alignItems="center">
        {generateVendors(vendors)}
        </Grid>

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