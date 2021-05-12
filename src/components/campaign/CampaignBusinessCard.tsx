import React from 'react';

import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Business from "../../model/business";

interface ICampaignBusinessCard {
  business: Business;
};

const useStyles = makeStyles(
  (theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    businessCard: {
      margin: theme.spacing(2),
      width: "100%",
    }
    
  }),
);

const CampaignBusinessCard: React.FC<ICampaignBusinessCard> = props => {

  const { business } = props;
  const styles = useStyles();

  return (
    <Card className={styles.businessCard}>
      <CardHeader
        title={business.businessName}
      />
      <CardContent>
        <Typography className={styles.title} color="textSecondary" gutterBottom>
            Phone #: {business.messagingNumber}
          </Typography>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            Number of Subscribers: {business.subscriberMap.size}
          </Typography>
      </CardContent>
      
    </Card>
  );
}

export default CampaignBusinessCard;