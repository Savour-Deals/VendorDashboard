import { 
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
import { Colors } from "../../../constants/Constants";
import Campaign from "../../../model/campaign";
import { LightTextTypography } from "../../common/Typography";
import { CampaignRow } from "./CampaignRow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "scroll",
			backgroundColor: `${Colors.background.dark}`
		},
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
		<div className={styles.root}>
      <Table 
				aria-label="campaign table">
        <TableHead>
          <TableRow>
            <TableCell>
							<LightTextTypography>
								Title
							</LightTextTypography>
						</TableCell>
            <TableCell>
							<LightTextTypography>
								{dateTimeTitle}
							</LightTextTypography>
						</TableCell>
            <TableCell>
							<LightTextTypography>
								Status
							</LightTextTypography>
						</TableCell>
            <TableCell>
							<LightTextTypography>
								Message
							</LightTextTypography>
						</TableCell>
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
    </div>
  )
};