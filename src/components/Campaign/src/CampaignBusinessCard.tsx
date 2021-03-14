import React from 'react';

import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface ICampaignBusinessCard {
  businessName: string;
  phoneNumber: string;
  subscriberCount: number;
};

const useStyles = makeStyles({
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
});

const CampaignBusinessCard: React.FC<ICampaignBusinessCard> = props => {

  const { businessName, phoneNumber, subscriberCount } = props;
  const styles = useStyles();

  return (
    <Card>
      <CardHeader
        title={businessName}
      />
      <CardContent>
        <Typography className={styles.title} color="textSecondary" gutterBottom>
            {phoneNumber}
          </Typography>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            {subscriberCount}
          </Typography>
      </CardContent>
      
    </Card>
  );
}

export default CampaignBusinessCard;