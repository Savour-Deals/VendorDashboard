import React, { useState, useEffect, useContext, useCallback } from "react";

import Alert from "@material-ui/lab/Alert/Alert";
import { Button, Grid} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { StripeProvider, Elements } from "react-stripe-elements";

import { Loading } from "../common/Loading";
import BusinessModal from "./BusinessModal";
import AddBusinessModal from "./addBusiness/AddBusinessModal";

import config from "../../config";
import { UserContext } from "../../auth/UserContext";
import { GetBusinessUser } from "../../accessor/BusinessUser";
import { GetBusiness, UpdateBusiness } from "../../accessor/Business";
import Business from "../../model/business";

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
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const [businessState, setBusinessState] = useState<{[key: string]: boolean}>({});
  const styles = useStyles();

  const loadBusinesses = useCallback(async () => {
    GetBusinessUser(userContext.user.username)
    .then((response) => {
      let businessPromises = response.businesses.map((id: string) => GetBusiness(id));
      return Promise.all(businessPromises);
    }).then((responses) => {
      responses.forEach((business: any) => {
        businessState[business.id] = false;
      });
      setBusinesses(responses);
      setBusinessState(businessState);
      setLoading(false);
      setError(undefined);
    }).catch((e) => {
      console.log(e);
      setLoading(false);
      setError(`Failed to load your profile`);
    });
  }, [businessState, setLoading, userContext.user]);

  const updateBusiness = async (updatedBusiness: Business) => {
    try {
      const res = await UpdateBusiness(updatedBusiness);
      console.log(res);
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
    setLoading(true);
    loadBusinesses();
  }, [loadBusinesses]);


  function handleClose() {
    setOpen(false);
    setLoading(true);
    loadBusinesses();
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