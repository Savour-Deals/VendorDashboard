import { 
	createStyles,
	makeStyles,
	Theme,
	Tab,
	Button,
	CircularProgress,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import moment from "moment";
import React, { ChangeEvent, useMemo } from "react";
import { useState } from "react";

import { Colors } from "../../../constants/Constants";
import Campaign from "../../../model/campaign";
import { LightTextTypography } from "../../common/Typography";
import { CampaignTable, CampaignTableType } from "./CampaignTable";

interface IAddCampaignTabs {
  campaigns: Campaign[];
	loading: boolean;
	addCampaignTapped: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
		title: {
      padding: theme.spacing(2),
    },
		button: {
      backgroundColor: Colors.primary.light,
      color: "white",
      margin: theme.spacing(2),
    },
  }),
);

export const CampaignTabs: React.FC<IAddCampaignTabs> = props => {
	const { campaigns, loading, addCampaignTapped } = props;
	const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState("0");

	const onTabChange = (event: ChangeEvent<{}>, value: string) => {
    setSelectedTab(value);
  }

	const {upcoming, past} = useMemo(() => {
		const upcoming = campaigns.filter((campaign: Campaign) => Date.parse(campaign.campaignDateTimeUtc) >= Date.now());
		const past = campaigns.filter((campaign: Campaign) => Date.parse(campaign.campaignDateTimeUtc) < Date.now());
		return {upcoming, past};
  }, [campaigns]);

  return (
		<>
			<LightTextTypography variant="h3" className={styles.title}>
				Campaigns           
				{!loading && 
					<Button 
						className={styles.button} 
						onClick={addCampaignTapped}>
						<AddIcon/> Create Campaign
					</Button>
				}
			</LightTextTypography>
			<br/>
			<TabContext value={selectedTab}>
				<TabList 
					onChange={onTabChange}>
					<Tab 
						value="0" 
						label={<LightTextTypography>Upcoming and in-progress</LightTextTypography>}/>
					<Tab 
						value="1" 
						label={<LightTextTypography>Past</LightTextTypography>}/>
				</TabList>
				<TabPanel style={{width: '90%'}} value="0">
					{loading &&
						<>
							<LightTextTypography variant="subtitle1">
								Loading Campaigns...
							</LightTextTypography>
							<CircularProgress/>
						</>
					}
					{(!loading && upcoming.length > 0) &&
						<CampaignTable
							campaigns={upcoming.sort((c1, c2) => moment(c1.campaignDateTimeUtc).diff(moment(c2.campaignDateTimeUtc)))}
							type={CampaignTableType.UPCOMING}
						/>
					}
					{(!loading  && upcoming.length === 0) &&
						<LightTextTypography variant="subtitle1">
							No campaigns scheduled. Schedule a new campaign!
						</LightTextTypography>
					}
				</TabPanel>
				<TabPanel style={{width: '90%'}} value="1">
					{loading &&
						<>
							<LightTextTypography variant="subtitle1">
								Loading Campaigns...
							</LightTextTypography>
							<CircularProgress/>
						</>
					}
					{(!loading && past.length > 0) &&
						<CampaignTable
							campaigns={past.sort((c1, c2) => moment(c2.campaignDateTimeUtc).diff(moment(c1.campaignDateTimeUtc)))}
							type={CampaignTableType.PAST}
						/>
					}
					{(!loading && past.length === 0)&&
						<LightTextTypography variant="subtitle1">
							No campaigns have run. Schedule a new campaign!
						</LightTextTypography>
					}
				</TabPanel>
			</TabContext>
		</>
  )
};