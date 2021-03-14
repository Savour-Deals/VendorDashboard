import React, { useState, useEffect, useContext, useCallback } from "react";

import Alert from "@material-ui/lab/Alert/Alert";
import { Button, Grid} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { StripeProvider, Elements } from "react-stripe-elements";
import { API } from "aws-amplify";

import { Loading } from "../common/Loading";
import VendorModal from "./VendorModal";
import AddVendorModal from "./addVendor/AddVendorModal";

import config from "../../config";
import { UserContext } from "../../auth/UserContext";
import { getVendors } from "../../accessor/BusinessUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center",
      alignItems: "center",
      alignContent: "center",
      paddingLeft: 250,
      [theme.breakpoints.only('sm')]: {
        paddingLeft: theme.spacing(1),
      },
      padding: theme.spacing(1),
      ...theme.mixins.toolbar
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

export const HomeBody: React.FC<IPageProps> = props => {

  const {loading, error, vendors, setVendors, setError, setLoading } = props;
  console.log(props);
  const INIT_VENDOR_STATE:  {[key: string]: boolean} = {};


  // initialize vendor modal state (everything is closed)
  for (const vendor of vendors) {
    INIT_VENDOR_STATE[vendor.placeId] = false;
  }

  const [stripe, setStripe] = useState(null);
  const [vendorState, setVendorState] = useState<{[key: string]: boolean}>({});
  const [open, setOpen] = useState(false);

  const styles = useStyles();


  const updateVendor = async (updatedVendor: Vendor) => {
    const placeId = updatedVendor.placeId;
    try {
      const  res = await API.put("businesses", `/businesses/${placeId}`, {
        body: {
          preset_messages: updatedVendor.presetMessages,
          onboard_message: updatedVendor.onboardMessage,
        }
      });
      console.log(res);
    } catch(error) {
      setError("Your profile could not be updated");
      toggleVendorModal(placeId, false);
    }
    const updatedVendorList = [];
    for (const index in vendors) {
      if (vendors[index].placeId === placeId) {
        updatedVendorList.push(updatedVendor)
      } else {
        updatedVendorList.push(vendors[index]);
      }
    }
    toggleVendorModal(placeId, false);
    setVendors(updatedVendorList) 
  }

  useEffect(() => {
    setStripe((window as any).Stripe(config.STRIPE_KEY));
  }, []);


  function handleClose() {
    setOpen(false);
  }

  function toggleVendorModal(placeId: string, isOpen: boolean) {
    const res = {
      ...vendorState,
      [placeId]: isOpen
    }
    setVendorState(res);
  }

  function generateVendors(vendors: Vendor[]): JSX.Element[] {
    return vendors.map((vendor : Vendor, index : number) => 
    <Grid item xs={3} key={vendor.placeId}>
      <VendorModal       
        key={vendor.placeId} 
        vendor={vendor} 
        vendorState={vendorState} 
        toggleVendorModal={toggleVendorModal} 
        updateVendor={updateVendor} />
      </Grid>
    );
  }

  function toggleModal() {
    setOpen(!open);
  }

  return ( 
    <div className={styles.root}>
    <StripeProvider stripe={stripe}>
      <>
      
      {loading &&
        <Loading />
      }
      {!loading && 
        <>
        {error && 
          <Alert severity="error">
            {error}
          </Alert>
        }  
        <div className={styles.root}>
          <Grid container spacing={3} direction="column" alignItems="center"> 
            <Grid item xs={12}>
              <Grid container justify="center" direction="row" spacing={3}>
                {vendors && generateVendors(vendors)}
              </Grid>
            </Grid>
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
              isLoading={loading}
            />
          </Elements>
        </div>
        </>
      }
      </>
    </StripeProvider>
    </div>
  );
}