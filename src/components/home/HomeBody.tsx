import React, { useState, useCallback } from "react";

import Alert from "@material-ui/lab/Alert/Alert";
import { Button, Typography} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Loading } from "../common/Loading";
import Business from "../../model/business";

import { AuthenticatedPageProperties } from "../../model/page";
import { COLORS } from "../../constants/Constants";
import AddBusinessModal from "../business/addbusiness/AddBusinessModal";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center",
      alignItems: "center",
      alignContent: "center",
      paddingLeft: 250,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
      padding: theme.spacing(1),
      ...theme.mixins.toolbar
    },
    img: {
        maxWidth:"15%",
        height:"auto",
    },
    button: {
      backgroundColor: COLORS.primary.light,
      color: "white",
      margin: theme.spacing(2),
    },
  }),
);

export const HomeBody: React.FC<AuthenticatedPageProperties> = props => {
  const {
    loading, 
    error, 
    businesses, 
    businessUser, 
    setBusinessUser, 
    setBusinesses, 
    setError, 
    setLoading 
  } = props;

  const [addBusinessModelOpen, setAddBusinessModelOpen] = useState(false);
  const styles = useStyles();

  const onClose = useCallback((business?: Business) => {
    if (business && businessUser) {
      //Modal stored data, update local here instead of fetching from server
      businessUser.businesses.push(business.id);
      setBusinessUser(businessUser);
      setBusinesses([...businesses, business]);
    }
    setLoading(false);
    setAddBusinessModelOpen(false);
  }, [businessUser, businesses, setBusinessUser, setBusinesses, setLoading]);

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (loading || !businessUser) {
    return (
      <div className={styles.root}>
        <Loading />
      </div>
    )
  }

  return ( 
    <div className={styles.root}>
      {businesses && businesses.length > 0 &&
        <Redirect to="/home" />
      } 
      {(!businesses || businesses.length === 0) &&
        <>
          <Typography variant="h4" >
            Add a business to start sending campaigns to your subscribers.
          </Typography>
          <Button 
            variant="contained"   
            className={styles.button} 
            onClick={() => setAddBusinessModelOpen(true)}>
              Add Business
          </Button>
          {addBusinessModelOpen &&
            <AddBusinessModal
              businessUser={businessUser}
              onClose={onClose}
              onError={(e) => setError(e)}
            />
          }
        </>
      }
    </div>
  );
}
