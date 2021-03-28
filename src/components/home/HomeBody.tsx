import React, { useState, useEffect } from "react";

import Alert from "@material-ui/lab/Alert/Alert";
import { Button, Grid} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { StripeProvider, Elements } from "react-stripe-elements";

import { Loading } from "../common/Loading";
import BusinessModal from "./BusinessModal";
import AddBusinessModal from "./addBusiness/AddBusinessModal";

import config from "../../config";
import { UpdateBusiness } from "../../accessor/Business";
import Business from "../../model/business";

import { AuthenticatedPageProperties } from "../../model/page";

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

export const HomeBody: React.FC<AuthenticatedPageProperties> = props => {

  const {loading, error, businesses, setBusinesses, setError, setLoading } = props;
  const INIT_BUSINESS_STATE:  {[key: string]: boolean} = {};


  // initialize vendor modal state (everything is closed)
  for (const business of businesses) {
    INIT_BUSINESS_STATE[business.id] = false;
  }

  const [stripe, setStripe] = useState(null);
  const [businessState, setBusinessState] = useState<{[key: string]: boolean}>({});
  const [open, setOpen] = useState(false);

  const styles = useStyles();


  const updateBusiness = async (updatedBusiness: Business) => {
    try {
      const res = await UpdateBusiness(updatedBusiness);
    } catch(error) {
      setError("Your profile could not be updated");
      toggleBusinessModal(updatedBusiness.id, false);
    }
    const updatedBusinessList = [];
    for (const index in businesses) {
      if (businesses[index].id === updatedBusiness.id) {
        updatedBusinessList.push(updatedBusiness)
      } else {
        updatedBusinessList.push(businesses[index]);
      }
    }
    toggleBusinessModal(updatedBusiness.id, false);
    setBusinesses(updatedBusinessList);
  }

  useEffect(() => {
    setStripe((window as any).Stripe(config.STRIPE_KEY));
  }, []);


  function handleClose() {
    setOpen(false);
  }

  function toggleBusinessModal(id: string, isOpen: boolean) {
    const res = {
      ...businessState,
      [id]: isOpen
    }
    setBusinessState(res);
  }

  function generateBusinesses(businesses: Business[]): JSX.Element[] {
    return businesses.map((business : Business, index : number) => 
    <Grid item key={business.id}>
      <BusinessModal       
        key={business.id} 
        business={business} 
        businessState={businessState} 
        toggleBusinessModal={toggleBusinessModal} 
        updateBusiness={updateBusiness} />
      </Grid>
    );
  }

  function toggleModal() {
    setOpen(!open);
  }


  function addBusiness(business: Business) {
    setBusinesses([...businesses, business])
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
                {generateBusinesses(businesses)}
              </Grid>
            </Grid>
          </Grid>
          <Button 
            variant="contained"   
            className={styles.button} 
            onClick={toggleModal}>
              Add Business
          </Button>
          <Elements>
            <AddBusinessModal
              open={open}
              handleClose={handleClose}
              isLoading={loading}
              addBusiness={addBusiness}
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