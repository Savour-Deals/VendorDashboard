import React, { useCallback, useMemo, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";
import { Button, Divider, Typography } from "@material-ui/core";

import { AuthenticatedPageProperties } from "../../model/page";
import Business from "../../model/business";
import Campaign from "../../model/campaign";
import AddCampaignModal from "../campaign/AddCampaignModal";
import useFetchCampaign from "../hooks/useFetchCampaign";
import { CampaignTabs } from "../campaign/campaigntabs/CampaignTabs";
import { BusinessDetails } from "../business/BusinessDetails";
import { BusinessCarousel } from "../business/BusinessCarousel";
import AddBusinessModal from "../business/addbusiness/AddBusinessModal";
import { Loading } from "../common/Loading";
import { COLORS } from "../../constants/Constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: 250,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1),
      },
      padding: theme.spacing(1),
      ...theme.mixins.toolbar
    },
    button: {
      backgroundColor: COLORS.primary.light,
      color: "white",
      margin: theme.spacing(2),
    },
  }),
);

export const HomePage: React.FC<AuthenticatedPageProperties> = props => {
  const { businesses, setBusinesses, businessUser, setBusinessUser } = props;
  const businessLoading = props.loading;
  const styles = useStyles();

  const [addBusinessModalOpen, setAddBusinessModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const { campaigns, setCampaigns, error, setError, loading } = useFetchCampaign(businesses);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses.length > 0 ? businesses[0]: null); 

  const addCampaign = (campaign: Campaign) => setCampaigns([...campaigns, campaign]);

  const onBusinessSelected = (business: Business) => {
    setSelectedBusiness(business);
  }

  const selectedCampaigns = useMemo(() => {
    if (selectedBusiness) {
      return campaigns.filter((campaign: Campaign) => campaign.businessId === selectedBusiness.id);
    }
    return [];
  }, [campaigns, selectedBusiness]);

  const addBusinessOnClose = useCallback((business?: Business) => {
    if (business && businessUser) {
      //Modal stored data, update local here instead of fetching from server
      businessUser.businesses.push(business.id);
      setBusinessUser(businessUser);
      setBusinesses([...businesses, business]);
    }
    setAddBusinessModalOpen(false);
  }, [businesses, businessUser, setBusinesses, setBusinessUser]);

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (loading || businessLoading || !businessUser) {
    return (
      <div className={styles.root}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {(businesses.length === 0) &&
        <>
          <Typography variant="h4" >
            Add a business to start sending campaigns to your subscribers.
          </Typography>
          <Button 
            variant="contained"   
            className={styles.button} 
            onClick={() => setAddBusinessModalOpen(true)}>
              Add Business
          </Button>
        </>
      } 
      {businesses && businesses.length > 0 &&
        <>
          {selectedBusiness && 
            <>
              <BusinessCarousel
                businesses={businesses}
                selectedBusiness={selectedBusiness}
                onBusinessSelected={onBusinessSelected}
                addBusinessTapped={() => setAddBusinessModalOpen(true)}/>
              <Divider />
              <BusinessDetails
                business={selectedBusiness}/>
              <Divider />
              <CampaignTabs
                campaigns={selectedCampaigns}
                loading={loading}
                addCampaignTapped={() => setCampaignModalOpen(true)}/>
              {campaignModalOpen && 
                <AddCampaignModal
                  handleModalClose={() => setCampaignModalOpen(false)}
                  businesses={businesses} 
                  setBusinesses={setBusinesses}
                  addCampaign={addCampaign}
                  selectedBusiness={selectedBusiness}/>
              }
            </>
          }
          {!selectedBusiness && "No Business"}
        </>
      }
      {addBusinessModalOpen &&
        <AddBusinessModal
          businessUser={businessUser}
          onClose={addBusinessOnClose}
          onError={(e) => setError(e)}
        />
      }
    </div>
  )
};