import React, { useState } from 'react';
import Fade from '../../common/Fade';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  createStyles, 
  IconButton, 
  makeStyles, 
  Modal, 
  Theme, 
  Dialog,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import Loader from "react-loader-spinner";
import Business, { Campaign } from "../../../model/business";
import { UpdateBusiness } from "../../../accessor/Business";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    card: {
      overflow: 'scroll',
      margin: theme.spacing(3),
      display: "inline-block",
      width: "90%",
    },
    root: {
      textAlign: "center",
      padding: theme.spacing(1),
      position: 'fixed',
      width: '100%',
      height: '100%',
      overflow: 'auto'
    },
    textInput: {
      width: '100%'
    },
    inputGrid: {
      margin: theme.spacing(3),
    },
    inputList: {
      flexGrow: 1
    },
    cardContent: {
      overflow: 'scroll',
      alignItems: 'center',
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
    },
    button: {
      backgroundColor: "#49ABAA",
      color: "white",
      margin: theme.spacing(2),
    },
    search: {
      textAlign: 'center',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    formFields: {
      margin: '25px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '75%',
      outline: '1px solid slategrey',
      boxShadow: '5px 5px 5px #888888'
    },
    cardField: {
      width: "100%",
      marginBottom: '15px',
      backgroundColor: 'white',
      padding: '11px 16px',
      borderRadius: '6px',
      border: '1px solid #CCC',
      boxShadow: 'inset 0 1px 1px rgba(102, 175, 233, 0.6)',
      lineHeight: '1.3333333'
    }
  })
);

const addCampaign = async (business: Business, campaign: Campaign, campaignId: string) => {
  if (!business.campaignsMap) business.campaignsMap = new Map<string, Campaign>();

  business.campaignsMap!.set(campaignId, campaign);

  await UpdateBusiness(business);
};

interface IAddCampaignModal {
  modalOpen: boolean;
  handleModalClose: () => void;
  businesses: Array<Business>;

}
const AddCampaignModal: React.FC<IAddCampaignModal> = props => {
  const { modalOpen, handleModalClose, businesses } = props;

  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Fade in={modalOpen}>
        <Card>
        <CardHeader
            action={
              <IconButton onClick={handleModalClose}>
                <CloseIcon/>
              </IconButton>
            }/>
          <CardContent>
          <Dialog open={isLoading}>
              <Loader type="ThreeDots" color="#49ABAA" height={100} width={100}/>
            </Dialog>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default AddCampaignModal;