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
	Theme,
} from "@material-ui/core";
import React, { useMemo } from "react";
import Campaign from "../../../model/campaign";
import { CampaignRow } from "./CampaignRow";

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

export enum CampaignTableType {
	UPCOMING,
	PAST
}

interface IAddCampaignTable {
  campaigns: Campaign[];
	type: CampaignTableType;
}

export const CampaignTable: React.FC<IAddCampaignTable> = props => {
	const { campaigns, type } = props;
  const styles = useStyles();

	const dateTimeTitle: string = useMemo(() => {
		if (type === CampaignTableType.UPCOMING) {
			return "Go-live date"
		}
		return "Date"
	}, [type])

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
            <TableCell >{dateTimeTitle}</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <CampaignRow
							key={campaign.id}
							campaign={campaign}
							type={type}
						/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};