import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";
import {
  Card, 
  CardContent, 
  CardHeader, 
  Button, 
  Grid,
  Typography

} from "@material-ui/core";

import { Loading } from "../../common/Loading";
import CampaignBusinessCard from "./CampaignBusinessCard";
import { AuthenticatedPageProperties } from "../../../model/page";
import Business from "../../../model/business";
import AddCampaignModal from "./AddCampaignModal";

import { UpdateBusiness } from "../../../accessor/Business";
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
    title: {
      padding: theme.spacing(2),
    },

  }),
);

const createBusinessCards = (businesses: Array<Business>) : Array<JSX.Element> => {
  return businesses.map((business: Business): JSX.Element => (
      <CampaignBusinessCard
        businessName={business.businessName}
        phoneNumber={business.twilioNumber!}
        subscriberCount={business.subscriberMap.size}
      />
    )
  );
};

const createCampaigns = (businesses: Array<Business>) : Array<JSX.Element> => {
  businesses.map(async (business: Business, index: number) => {
    return index;
  });
  return [];
}

const Campaigns: React.FC<AuthenticatedPageProperties> = props => {
  const { error, loading, businesses } = props;
  const styles = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  }

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Card>
                <CardHeader
                />
                <CardContent>
                  <Typography variant="h3" className={styles.title}>
                    Campaigns
                  </Typography>
                  {createBusinessCards(businesses)}
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
                <CardHeader
                />
                <CardContent>
                <Typography variant="h3" className={styles.title}>
                  Campaigns
                </Typography>
                  {createCampaigns(businesses)}
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button className={styles.button} onClick={() => setModalOpen(true)}>
              Create Campaign
            </Button>
          </Grid>
        </Grid>
        <AddCampaignModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
        />
      </div>
    </>
  )
};

export default Campaigns; 