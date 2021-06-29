import { useState, useEffect, useCallback, SetStateAction, Dispatch } from 'react';
import Business from '../../model/business';
import Campaign from "../../model/campaign";
import { GetAll } from '../../accessor/Push';
import _ from 'lodash';

interface CampaignFetchResult {
  campaigns: Array<Campaign>;
  setCampaigns: Dispatch<SetStateAction<Campaign[]>>;
  error?: string;
  setError: Dispatch<SetStateAction<string | undefined>>
  loading: boolean;
};

function useFetchCampaign(businesses: Array<Business>): CampaignFetchResult {
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchCampaigns = useCallback(async () => {
    const campaignPromises: Array<Promise<Array<Campaign>>> = [];

    businesses.map(async (business: Business) => {
      const res: Promise<Array<Campaign>> = GetAll(business.id)
      .then((campaigns: Array<Campaign>) => {
        console.log(res);
        return campaigns;
      })
      .catch(e => {
        setError(e);
        return e;
      });

      campaignPromises.push(res);
    });

    console.log(campaignPromises);
    const campaignsArray = await Promise.all(campaignPromises);

    console.log(campaignsArray);
    setCampaigns(_.flatten(campaignsArray));
    setLoading(false);
  }, [businesses]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return { campaigns, setCampaigns, error, setError, loading };
}

export default useFetchCampaign;