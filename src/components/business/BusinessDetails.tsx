import { 
	createStyles,
	makeStyles,
	Theme,
	Typography,
	ListItem,
	ListItemText,
	List,
	IconButton,
	Grid
} from "@material-ui/core";
import React, { useState } from "react";
import Business from "../../model/business";
import EditIcon from "@material-ui/icons/Edit";

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
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
  return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={11}>
					<Typography variant="h3" className={styles.title}>
						{business.businessName}
					</Typography>
				</Grid>	
				<Grid item xs={1}>
					<IconButton>
						<EditIcon/>
					</IconButton>
				</Grid>
			</Grid>

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