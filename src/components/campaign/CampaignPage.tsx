import React, { useMemo, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";
import { Divider } from "@material-ui/core";


import { AuthenticatedPageProperties } from "../../model/page";
import Business from "../../model/business";
import Campaign from "../../model/campaign";
import AddCampaignModal from "./AddCampaignModal";
import useFetchCampaign from "../hooks/useFetchCampaign";
import { CampaignTabs } from "./campaigntabs/CampaignTabs";
import { BusinessDetails } from "../business/BusinessDetails";
import { BusinessCarousel } from "../business/BusinessCarousel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: 250,
      [theme.breakpoints.only('sm')]: {
        paddingLeft: theme.spacing(1),
      },
      padding: theme.spacing(1),
      ...theme.mixins.toolbar
    },
  }),
);

export const CampaignPage: React.FC<AuthenticatedPageProperties> = props => {
  const { businesses, setBusinesses } = props;
  const styles = useStyles();

  const [businessModalOpen, setBusinessModalOpen] = useState(false);
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

  return (
    <>
      {error && 
        <Alert severity="error">
          {error}
        </Alert>
      }
      {selectedBusiness && 
        <div className={styles.root}>
          <BusinessCarousel
            businesses={businesses}
            selectedBusiness={selectedBusiness}
            onBusinessSelected={onBusinessSelected}/>
          <Divider />
          <BusinessDetails
            business={selectedBusiness}/>
          <Divider />
          <CampaignTabs
            campaigns={selectedCampaigns}
            loading={loading}
            openAddCampaignModal={() => setCampaignModalOpen(true)}/>
          {campaignModalOpen && 
            <AddCampaignModal
              modalOpen={true}
              handleModalClose={() => setCampaignModalOpen(false)}
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