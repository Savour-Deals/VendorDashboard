import React, { ChangeEvent, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";
import {
  Button, 
  Grid,
  Typography,
  Tab
} from "@material-ui/core";

import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";

import { Loading } from "../common/Loading";
import CampaignBusinessCard from "./CampaignBusinessCard";
import { AuthenticatedPageProperties } from "../../model/page";
import Business, { Campaign } from "../../model/business";
import AddCampaignModal from "./AddCampaignModal";
import useFetchCampaign from "../hooks/useFetchCampaign";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { CampaignTable } from "./CampaignTable";

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
    tabs: {
      width: "100%",
    }
  }),
);

export const CampaignPage: React.FC<AuthenticatedPageProperties> = props => {
  const { loading, businesses, setBusinesses } = props;
  const styles = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const { campaigns, setCampaigns, error } = useFetchCampaign(businesses);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses.length > 0 ? businesses[0]: null); 
  const [selectedTab, setSelectedTab] = useState("0");
  const addCampaign = (campaign: Campaign) => setCampaigns([...campaigns, campaign]);

  const handleModalClose = () => {
    setModalOpen(false);  
  };

  const onBusinessSelected = (business: Business) => {
    setSelectedBusiness(business);
  }

  const onTabChange = (event: ChangeEvent<{}>, value: string) => {
    setSelectedTab(value);
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
      {selectedBusiness && 
        <div className={styles.root}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Carousel 
                responsive={responsive}>
                {
                  businesses.map((business: Business) => 
                    <CampaignBusinessCard
                      business={business}
                      selected={selectedBusiness ? selectedBusiness.id === business.id : false}
                      onSelect={onBusinessSelected}/>)
                }
              </Carousel>
            </Grid>
            <Typography variant="h3" className={styles.title}>
              {selectedBusiness?.businessName} Campaigns
            </Typography>
            <TabContext value={selectedTab}>
              <TabList 
                onChange={onTabChange}
                variant="fullWidth"
                className={styles.tabs}>
                <Tab value="0" label="Upcoming and in-progress"/>
                <Tab value="1" label="Past"/>
              </TabList>
              <TabPanel style={{width: '100%'}} value="0">
                <CampaignTable
                  campaigns={campaigns
                    .filter((campaign: Campaign) => campaign.businessId === selectedBusiness.id)
                    .filter((campaign: Campaign) => Date.parse(campaign.campaignDateTimeUtc) >= Date.now())}
                />
              </TabPanel>
              <TabPanel style={{width: '100%'}} value="1">
                {campaigns && selectedBusiness && 
                  <CampaignTable
                    campaigns={campaigns
                      .filter((campaign: Campaign) => campaign.businessId === selectedBusiness.id)
                      .filter((campaign: Campaign) => Date.parse(campaign.campaignDateTimeUtc) < Date.now())}
                  />
                }
              </TabPanel>
            </TabContext>
            <Grid item xs={12}>
              <Button className={styles.button} onClick={() => setModalOpen(true)}>
                Run New Campaign
              </Button>
            </Grid>
          </Grid>
          {modalOpen && 
            <AddCampaignModal
              modalOpen={true}
              handleModalClose={handleModalClose}
              businesses={businesses} 
              setBusinesses={setBusinesses}
              addCampaign={addCampaign}/>
          }

        </div>
      }
      {!selectedBusiness && "No Business"}
      
    </>
  )
};