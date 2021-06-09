import React from 'react';

import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Business from "../../model/business";

interface ICampaignBusinessCard {
  business: Business;
  onSelect: (business: Business) => void;
  selected: boolean;
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
      width: "90%",
      borderRadius: 10,
      padding: 10,
    },
    businessCardSelected: {
      margin: theme.spacing(2),
      width: "90%",
      borderRadius: 10,
      padding: 10,
      boxShadow: '0px 0px 10px #9F9F9F'
    }
  }),
);

const CampaignBusinessCard: React.FC<ICampaignBusinessCard> = props => {

  const { business, onSelect, selected } = props;
  const styles = useStyles();

  return (
    <div onClick={() => onSelect(business)}>
      <Card 
        className={selected ? styles.businessCardSelected : styles.businessCard } >
        <CardHeader title={business.businessName}/>
      </Card>
    </div>

  );
}

export default CampaignBusinessCard;