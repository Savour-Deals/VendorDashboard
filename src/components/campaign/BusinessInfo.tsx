import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Business from '../../model/business';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(2),
    },
  }),
);
const BusinessInfo: React.FC<{selectedBusiness: Business}> = props => {
    const styles = useStyles();
    
    const { selectedBusiness } = props;
    return (
        <>
        <Divider />
        <Typography variant="h3" className={styles.title}>
          {selectedBusiness?.businessName}
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Address" secondary={selectedBusiness?.address}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone number" secondary={selectedBusiness?.messagingNumber}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Number of subscribers" secondary={Object.keys(selectedBusiness.subscriberMap).length}/>
          </ListItem>
        </List>
        <Divider />
        </>
    );
}

export default BusinessInfo;