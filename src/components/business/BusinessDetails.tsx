import { 
	createStyles,
	makeStyles,
	Theme,
	ListItem,
	ListItemText,
	List,
	IconButton,
	Grid,
	Tooltip
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import React, { useMemo, useState } from "react";
import Business, { SubscriberInfo } from "../../model/business";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BusinessEditModal from "./BusinessEditModal";
import { Colors } from "../../constants/Constants";
import { LightTextTypography } from "../common/Typography";


interface IBusinessDetails {
  business: Business;
	updateBusiness: (business: Business) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
		title: {
      padding: theme.spacing(2),
    },
		icon: {
			color: Colors.text.light
		}
  }),
);

export const BusinessDetails: React.FC<IBusinessDetails> = props => {
	const { business, updateBusiness } = props;
	const styles = useStyles();


	const openModal = () => setModalOpen(true);

	const [modalOpen, setModalOpen] = useState(false);

	const subscriberCount = useMemo(() => {
    if (business.subscriberMap) {
      let subscribedUsers = Object.values(business.subscriberMap).filter((v: SubscriberInfo) => v.subscribed);
      return subscribedUsers.length;
    }
    return 0;
  }, [business]);

	const phoneNumber = useMemo(() => {
			if (!business.messagingNumber) {
				return undefined;
			}
			
			let match = business.messagingNumber.match(/^(\+?\d{1,3}|\d{1,4})?(\d{3})(\d{3})(\d{4})$/);
			//Try to format number in more friendly way
			if (match) {
				const start = match[1] ? `${match[1]} (` : '(';
				return [start, match[2], ')-', match[3], '-', match[4]].join('')
			}
			// Otherwise fallback to original
			return business.messagingNumber;
	}, [business])

  return (
		<>
			<Grid container direction="row" justifyContent="flex-start" alignItems="center">
				<Grid item >
					<LightTextTypography variant="h3" className={styles.title}>
						{business.businessName}
					</LightTextTypography>
				</Grid>	
				<Grid item >
					<IconButton
						onClick={() => openModal()}>
						<EditIcon className={styles.icon}/>
					</IconButton>
				</Grid>
			</Grid>
			<List>
			<ListItem>
				<ListItemText 
					primary={<LightTextTypography variant="h5">Address</LightTextTypography>} 
					secondary={<LightTextTypography variant="body1">{business.address}</LightTextTypography>}/>
			</ListItem>
			<ListItem>
				<ListItemText 
					primary={
						<>
							<LightTextTypography variant="h5">Phone number</LightTextTypography>
							<Tooltip 
								title={
									<LightTextTypography variant="body2">
										This is the phone number your subscribers will receive messages from. Subscribers should text 'sub' to this number to start receiving messages.
									</LightTextTypography>
								}
								arrow>
								<IconButton aria-label="phone number help">
									<HelpOutlineIcon className={styles.icon}/>
								</IconButton>
							</Tooltip>
						</>
					} 
					secondary={<LightTextTypography variant="body1">{phoneNumber}</LightTextTypography>}/>
			</ListItem>
			<ListItem>
				<ListItemText 
					primary={<LightTextTypography variant="h5">Number of subscribers</LightTextTypography>} 
					secondary={<LightTextTypography variant="body1">{subscriberCount}</LightTextTypography>}/>
			</ListItem>
			</List>
			<BusinessEditModal
				business={business}
				modalOpen={modalOpen}
				toggleBusinessModal={setModalOpen}
				updateBusiness={updateBusiness}
			/>
		</>
  )
};