import { 
	createStyles,
	makeStyles,
	Theme,
	Typography,
	ListItem,
	ListItemText,
	List
} from "@material-ui/core";
import React from "react";
import Business from "../../model/business";

interface IBusinessDetails {
  business: Business;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
		title: {
      padding: theme.spacing(2),
    },
  }),
);

export const BusinessDetails: React.FC<IBusinessDetails> = props => {
	const { business } = props;
	const styles = useStyles();

  return (
		<>
			<Typography variant="h3" className={styles.title}>
				{business.businessName}
			</Typography>
			<List>
			<ListItem>
				<ListItemText primary="Address" secondary={business.address}/>
			</ListItem>
			<ListItem>
				<ListItemText primary="Phone number" secondary={business.messagingNumber}/>
			</ListItem>
			<ListItem>
				<ListItemText primary="Number of subscribers" secondary={Object.keys(business.subscriberMap).length}/>
			</ListItem>
			</List>
		</>
  )
};