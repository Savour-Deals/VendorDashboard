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
import { GetBusinessUser } from "../../accessor/BusinessUser";
import { GetBusiness } from "../../accessor/Business";

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

export const HomeBody: React.FC = () => {
  const userContext: IUserContext = useContext(UserContext);
  const [error, setError] = useState<string>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [vendors, setVendors] = useState<Array<Vendor>>([]);
  const [vendorState, setVendorState] = useState<{[key: string]: boolean}>({});
  const styles = useStyles();

  const loadVendors = useCallback(async () => {
    const loadedVendors: Array<Vendor> = [];
    const loadedVendorState:  {[key: string]: boolean} = {};
    GetBusinessUser(userContext.user.username)
    .then((response) => {
      const vendorPromises = response.businesses ? response.businesses.map((id: string) => GetBusiness(id)) : [];
      return Promise.all(vendorPromises);
    }).then((responses) => {
      responses.forEach((vendor: any) => {
        loadedVendors.push({
          placeId: vendor.place_id,
          vendorName: vendor.business_name,
          primaryAddress: vendor.address,
          buttonId: vendor.btn_id,
          onboardMessage: vendor.onboard_message,
          presetMessages: vendor.preset_messages,
          twilioNumber: vendor.twilio_number,
        });
        loadedVendorState[vendor.place_id] = false;
      });
      setVendors(loadedVendors);
      setVendorState(loadedVendorState);
      setLoading(false);
      setError(undefined);
    }).catch((e) => {
      console.log(e);
      setLoading(false);
      setError("Failed to load your profile");
    });


  }, [setVendorState, setVendors, setLoading, userContext.user]);

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
    setLoading(true);
    loadVendors();
  }, [loadVendors]);


  function handleClose() {
    setOpen(false);
    setLoading(true);
    loadVendors();
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
    <Grid item key={vendor.placeId}>
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
              <Grid container justify="center" direction="column" spacing={3}>
                {generateVendors(vendors)}
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