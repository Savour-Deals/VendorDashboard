import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";

import { Loading } from "../../common/Loading";
import CampaignBuisnessCard from "./CampaignBusinessCard";

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

interface ICampaigns {
  loading: boolean;
  error: string | undefined;
  vendors: Array<Vendor>;
  setVendors: (vendors: Array<Vendor>) => void;
  phoneNumber?: string;
}


const createBusinessCards = (vendors: Array<Vendor>) : Array<JSX.Element> => {
  return vendors.map((vendor: Vendor): JSX.Element => (
      <CampaignBuisnessCard
        businessName={vendor.vendorName}
        phoneNumber={vendor.twilioNumber!}
        subscriberCount={vendor.subscribers ? Object.keys(vendor.subscribers).length : 0}
      />
    )
  );
};

const Campaigns: React.FC<ICampaigns> = props => {
  const { error, loading, vendors } = props;
  const styles = useStyles();
  return (
    <>
          {loading &&
        <Loading />
      }
      {error && 
      <Alert severity="error">
        {error}
      </Alert>
      }  
      <div className={styles.root}>
        {createBusinessCards(vendors)}
      </div>
    </>
  )
};

export default Campaigns; 