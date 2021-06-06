import React, { ChangeEvent, useMemo, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";
import {
  Button, 
  Grid,
  Typography,
  Tab,
  CircularProgress
} from "@material-ui/core";

import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";

import CampaignBusinessCard from "./CampaignBusinessCard";
import { AuthenticatedPageProperties } from "../../model/page";
import Business from "../../model/business";
import Campaign from "../../model/campaign";
import AddCampaignModal from "./AddCampaignModal";
import useFetchCampaign from "../hooks/useFetchCampaign";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { CampaignTable, CampaignTableType } from "./CampaignTable";
import { COLORS } from "../../constants/Constants";

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
      backgroundColor: COLORS.primary.light,
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
  const { businesses, setBusinesses } = props;
  const styles = useStyles();

  const [modalOpen, setModalOpen] = useState(false);
  const { campaigns, setCampaigns, error, loading } = useFetchCampaign(businesses);
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

  const {upcoming, past} = useMemo(() => {
    if (selectedBusiness) {
      const businessCampaigns = campaigns
        .filter((campaign: Campaign) => campaign.businessId === selectedBusiness.id);
      const upcoming = businessCampaigns.filter((campaign: Campaign) => Date.parse(campaign.campaignDateTimeUtc) >= Date.now());
      const past = businessCampaigns.filter((campaign: Campaign) => Date.parse(campaign.campaignDateTimeUtc) < Date.now());
      return {upcoming, past};
    }
    return {upcoming: [], past: []};
  }, [campaigns, selectedBusiness]);

  return (
    <>
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
                {(!loading && upcoming.length > 0)&&
                  <CampaignTable
                    campaigns={upcoming}
                    type={CampaignTableType.UPCOMING}
                  />
                }
                {(!loading  && upcoming.length === 0) &&
                  <Typography variant="subtitle1">
                    No campaigns scheduled. Schedule a new campaign!
                  </Typography>
                }
              </TabPanel>
              <TabPanel style={{width: '100%'}} value="1">
                {(!loading && past.length > 0)&&
                  <CampaignTable
                    campaigns={past}
                    type={CampaignTableType.PAST}
                  />
                }
                {(!loading && past.length === 0)&&
                  <Typography variant="subtitle1">
                    No campaigns have run. Schedule a new campaign!
                  </Typography>
                }
              </TabPanel>
            </TabContext>

            <Grid item xs={12}>
              {loading &&
                <CircularProgress/>
              }
              {!loading && 
                <Button className={styles.button} onClick={() => setModalOpen(true)}>
                  Run New Campaign
                </Button>
              }
            </Grid>
          </Grid>
          {modalOpen && 
            <AddCampaignModal
              modalOpen={true}
              handleModalClose={handleModalClose}
              businesses={businesses} 
              setBusinesses={setBusinesses}
              addCampaign={addCampaign}
              selectedBusiness={selectedBusiness}/>
          }
        </div>
      }
      {!selectedBusiness && "No Business"}
      
    </>
  )
};