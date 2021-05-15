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

import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";

import { Loading } from "../common/Loading";
import CampaignBusinessCard from "./CampaignBusinessCard";
import { AuthenticatedPageProperties } from "../../model/page";
import Business, { Campaign } from "../../model/business";
import AddCampaignModal from "./AddCampaignModal";
import useFetchCampaign from "../hooks/useFetchCampaign";
import CampaignCard from "./CampaignCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
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



export const CampaignPage: React.FC<AuthenticatedPageProperties> = props => {
  const { loading, businesses, setBusinesses } = props;
  const styles = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const { campaigns, setCampaigns, error } = useFetchCampaign(businesses);
  const [selected, setSelected] = useState(businesses.length > 0 ? businesses[0]: null); 

  const addCampaign = (campaign: Campaign) => setCampaigns([...campaigns, campaign]);

  const handleModalClose = () => {
    setModalOpen(false);  
  };

  const onBusinessSelected = (business: Business) => {
    setSelected(business);
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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Carousel 
              responsive={responsive}>
              {
                businesses.map((business: Business) => 
                  <CampaignBusinessCard
                    business={business}
                    selected={selected ? selected.id === business.id : false}
                    onSelect={onBusinessSelected}/>)
              }
            </Carousel>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader/>
              <CardContent>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                <Typography variant="h3" className={styles.title}>
                  Campaigns
                </Typography>
                </Grid>
                {campaigns && selected && 
                  campaigns.filter((campaign: Campaign) => campaign.businessId === selected.id).map((campaign: Campaign) => <CampaignCard
                    business={selected}
                    campaign={campaign}
                  />)
                }
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
          setBusinesses={setBusinesses}
          addCampaign={addCampaign}
        />
      </div>
    </>
  )
};