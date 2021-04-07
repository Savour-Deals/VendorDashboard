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
import CampaignCard from "./CampaignCard";
import { AuthenticatedPageProperties } from "../../../model/page";
import Business, { Campaign } from "../../../model/business";
import AddCampaignModal from "./AddCampaignModal";
import { v4 as uuidv4 } from 'uuid';

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
    businessCards: {
      minWidth: "80%",
    },
  }),
);





const Campaigns: React.FC<AuthenticatedPageProperties> = props => {
  const { error, loading, businesses, setBusinesses } = props;
  const styles = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const createBusinessCards = (businesses: Array<Business>) : Array<JSX.Element> => {
    return businesses.map((business: Business): JSX.Element => (
      <Grid item xs={12} className={styles.businessCards}> 
        <CampaignBusinessCard
          business={business}
        />
      </Grid>
  
  
      )
    );
  };
  
  const createCampaignCards = (businesses: Array<Business>) : Array<JSX.Element> => {
    const campaigns: Array<JSX.Element> = [];
  
    businesses.forEach((business: Business) => {
      if (business.campaignsMap) {
        business.campaignsMap!.forEach((campaign: Campaign, key: string) => {
          campaigns.push(
            <CampaignCard
              business={business}
              campaign={campaign}
            />
          )
        });
      }
    });
    return campaigns;
  }
  const addCampaign = async (business: Business, campaign: Campaign) => {
    // add the campaign map if it doesn't already exist!
    if (!business.campaignsMap) business.campaignsMap = new Map<string, Campaign>();

    const campaignId = uuidv4();
    business.campaignsMap!.set(campaignId, campaign);


    await UpdateBusiness(business);

    // update current business object 
    const updatedBusinesses = businesses.map((oldBusiness: Business) =>  oldBusiness.id ===  business.id ? business : oldBusiness);

    setBusinesses(updatedBusinesses);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
          <Card>
                <CardHeader
                />
                <CardContent>
                <Grid container spacing={1} alignItems="center" direction="column">
                  <Grid item xs={6}>
                  <Typography variant="h3" className={styles.title}>
                    Businesses
                  </Typography>
                  </Grid>
                  {createBusinessCards(businesses)}
                </Grid>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
                <CardHeader
                />
                <CardContent>

                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12}>
                  <Typography variant="h3" className={styles.title}>
                    Campaigns
                  </Typography>
                  </Grid>
                  {createCampaignCards(businesses)}
                </Grid>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button className={styles.button} onClick={() => setModalOpen(true)}>
              Run New Campaign
            </Button>
          </Grid>
        </Grid>
        <AddCampaignModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          businesses={businesses} 
          addCampaign={addCampaign}
        />
      </div>
    </>
  )
};

export default Campaigns; 