import React, { useState, useEffect, useCallback } from 'react';
import Business, { Campaign } from '../../model/business';
import { GetAll } from '../../accessor/Push';
import _ from 'lodash';

interface CampaignFetchResult {
  campaigns: Array<Campaign>;
  error?: string;
};

function useFetchCampaign(businesses: Array<Business>): CampaignFetchResult {
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);
  const [error, setError] = useState();

  const fetchCampaigns = useCallback(async () => {
    const campaignPromises: Array<Promise<Array<Campaign>>> = [];

    businesses.map(async (business: Business) => {
      const res: Promise<Array<Campaign>> = GetAll(business.id)
      .then((campaigns: Array<Campaign>) => {
        return campaigns;
      })
      .catch(e => {
        setError(e);
        return e;
      });
      
      campaignPromises.concat(res);
    });


    const campaignsArray = [...(await Promise.all(campaignPromises))];
    setCampaigns(_.flatten(campaignsArray));
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [campaigns, setCampaigns]);

  return { campaigns, error };
}

export default useFetchCampaign;