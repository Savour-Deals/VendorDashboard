import React from 'react';

import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface ICampaignBusinessCard {
  businessName: string;
  phoneNumber: string;
  subscriberCount: number;
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
      width: "80%",
    }

  }),
);

const CampaignBusinessCard: React.FC<ICampaignBusinessCard> = props => {

  const { businessName, phoneNumber, subscriberCount } = props;
  const styles = useStyles();

  return (
    <Card className={styles.businessCard}>
      <CardHeader
        title={businessName}
      />
      <CardContent>
        <Typography className={styles.title} color="textSecondary" gutterBottom>
            Phone #: {phoneNumber}
          </Typography>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            Number of Subscribers: {subscriberCount}
          </Typography>
      </CardContent>
      
    </Card>
  );
}

export default CampaignBusinessCard;