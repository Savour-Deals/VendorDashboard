import { Button, Card, CardContent, CardHeader, Grid, IconButton, TextField, Modal, Fade } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext, useCallback } from "react";
import  AddVendorModal  from "./AddVendorModal";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../../../config";
import { API } from "aws-amplify";
import { UserContext } from "../../../auth";
import { LoadingDialog } from "./LoadingDialog";
import EditIcon from "@material-ui/icons/Edit";
import VendorModal from "./VendorModal";

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
  const [vendorState, setVendorState] = useState<{[key: string]: boolean}>({});
  const styles = useStyles();

  const loadVendors = useCallback(async () => {
    const userName = userContext.user ? userContext.user.username : "";

    const getBusinessUserResponseData = await API.get(
      "business_users",
      "/business_users/" + userName,
      {});
      const placeIds: Array<string> = getBusinessUserResponseData.businesses;
      const vendors: Array<Vendor> = [];

      const vendorState: {[key: string]: boolean} = {};

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
        vendorState[id] = false;
      }

    setVendors(vendors);
    setVendorState(vendorState);
    setLoading(false);
  }, [setVendors]);


  const updateVendor = async (updatedVendor: Vendor) => {
    const placeId = updatedVendor.placeId;
    try {
      await API.put("businesses", `/businesses/${placeId}`, {
        body: {
          ...updatedVendor,
        }
      });
    } catch(error) {
      alert(`Sorry! The use could not be updated: ${error}`);
    }
    toggleVendorModal(placeId, false);
  }

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

  function toggleVendorModal(placeId: string, isOpen: boolean) {
    const res = {
      ...vendorState,
      [placeId]: isOpen
    }
    setVendorState(res);
  }

  function generateVendors(vendors: Vendor[]): JSX.Element[] {
    
    return vendors.map((vendor : Vendor, index : number) => <VendorModal 
      key={vendor.placeId} 
      vendor={vendor} 
      vendorState={vendorState} 
      toggleVendorModal={toggleVendorModal} 
      updateVendor={updateVendor} />
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