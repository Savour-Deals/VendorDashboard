import {  
	TableRow, 
	TableCell,
} from "@material-ui/core";
import React from "react";
import Campaign, { CampaignStatusColors, CampaignStatusText } from "../../model/campaign";
import { CampaignTableType } from "./CampaignTable";
import { DateTimeFormat } from "../../constants/Constants";
import Chip from '@material-ui/core/Chip';
import moment from 'moment-timezone';

interface IAddCampaignTableRow {
  campaign: Campaign;
	type: CampaignTableType;
}

export const CampaignRow: React.FC<IAddCampaignTableRow> = (props: IAddCampaignTableRow) => {
	const { campaign } = props;
	const tz = moment.tz.guess();
	const color = CampaignStatusColors[campaign.campaignStatus];

  return (
		<TableRow key={campaign.id}>
			<TableCell component="th" scope="row">
				{campaign.campaignName}
			</TableCell>
			<TableCell >{moment.tz(campaign.campaignDateTimeUtc, tz).format(DateTimeFormat.SHORT_LOCALIZED_DATE_TIME)}</TableCell>
			<TableCell >
				<Chip 
					color='primary' 
					style={{ backgroundColor: color}}
					label={CampaignStatusText[campaign.campaignStatus]}/>
			</TableCell>
			<TableCell >
				{campaign.message}
			</TableCell>
		</TableRow>
  )
};