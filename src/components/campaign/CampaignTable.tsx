import { 
	TableContainer, 
	Paper, 
	Table, 
	TableHead, 
	TableRow, 
	TableCell, 
	TableBody, 
	createStyles,
	makeStyles,
	Theme
} from "@material-ui/core";
import React from "react";
import { Campaign } from "../../model/business";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
		},
		table: {
			width: "100%",
		}
  })
);

interface IAddCampaignTable {
  campaigns: Campaign[];
}

export const CampaignTable: React.FC<IAddCampaignTable> = props => {
	const { campaigns } = props;
  const styles = useStyles();

  return (
		<TableContainer 				
			className={styles.root} 
			component={Paper}>
      <Table 
				style={{ minWidth: "100%" }}
				aria-label="campaign table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell >Go-live date</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell component="th" scope="row">
                {campaign.campaignName}
              </TableCell>
              <TableCell >{campaign.campaignDateTimeUtc}</TableCell>
              <TableCell >{campaign.campaignStatus}</TableCell>
              <TableCell >{campaign.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};