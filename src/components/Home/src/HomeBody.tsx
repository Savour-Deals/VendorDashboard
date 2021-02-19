import { Button, Grid} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext, useCallback } from "react";
import  AddVendorModal  from "./AddVendorModal";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../../../config";
import { API } from "aws-amplify";
import { UserContext } from "../../../auth";
import VendorModal from "./VendorModal";
import Alert from "@material-ui/lab/Alert/Alert";
import { Loading } from "./Loading";

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
  const [errorOpen, setErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [vendors, setVendors] = useState<Array<Vendor>>([]);
  const [vendorState, setVendorState] = useState<{[key: string]: boolean}>({});
  const styles = useStyles();

  const loadVendors = useCallback(async () => {
    const userName = userContext.user ? userContext.user.username : "";

    API.get(
      "business_user",
      "/business_user/" + userName,
    {}).then((response) => {
      let vendorPromises = response.businesses.map((id: String) => API.get("business", `/business/${id}`, {}));
      return Promise.all(vendorPromises);
    }).then((responses) => {
      responses.forEach((vendor: any) => {
        vendors.push({
          placeId: vendor.id,
          vendorName: vendor.business_name,
          primaryAddress: vendor.address,
          buttonId: vendor.btn_id,
          onboardDeal: vendor.onboard_deal,
          singleClickDeal: vendor.single_click_deal,
          doubleClickDeal: vendor.double_click_deal,
          longClickDeal: vendor.long_click_deal,
          twilioNumber: vendor.twilio_number,
        });
        vendorState[vendor.id] = false;
      });
  
      setVendors(vendors);
      setVendorState(vendorState);
      setLoading(false);
      setError(undefined);
    }).catch((e) => {
      console.log(e);
      setLoading(false);
      setError("Failed to load your profile");
      setErrorOpen(true);
    });
  }, [setVendors,setVendorState,setLoading, userContext.user]);

  const updateVendor = async (updatedVendor: Vendor) => {
    const placeId = updatedVendor.placeId;
    try {
      const  res = await API.put("businesses", `/businesses/${placeId}`, {
        body: {
          single_click_deal: updatedVendor.singleClickDeal,
          double_click_deal: updatedVendor.doubleClickDeal,
          long_click_deal: updatedVendor.longClickDeal,
          onboard_deal: updatedVendor.onboardDeal,
        }
      });
      console.log(res);
    } catch(error) {
      setError("Your profile could not be updated");
      setErrorOpen(true);
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
              addVendor={addVendors}
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