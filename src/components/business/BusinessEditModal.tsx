import React, { useState } from 'react';

import { Card, CardContent, CardHeader, createStyles, Fade, makeStyles, Modal, Theme, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

import Business from '../../model/business';
import { MessageInputForm } from '../common/forms/MessageInputForm';
import { COLORS } from '../../constants/Constants';

interface IBusinessModal {
  business: Business;
  modalOpen: boolean;
  toggleBusinessModal: (isOpen: boolean) => void;
  updateBusiness: (updatedBusiness: Business) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    margin: theme.spacing(3),
    display: "inline-block",
    alignContent: "center",
    alignItems: "center",
    width: "inherit",
    height: "inherit",
  },
  cardContent: {
    alignItems: "center",
    width: "inherit",
  },
  button: {
    backgroundColor: COLORS.primary.light,
    color: "white",
    margin: theme.spacing(2),
  },
  modal: {
    margin: theme.spacing(3),
    display: "inline-block",
    alignContent: "center",
    alignItems: "center",
    width: "inherit",
    height: "inherit",
  }
}));

const BusinessModal: React.FC<IBusinessModal> = props => {
  
  const { business, modalOpen, toggleBusinessModal, updateBusiness } = props;
  const styles = useStyles();

  const [presetMessages, setPresetMessages] = useState<string[]>(business.presetMessages || []);
  const [onboardMessage, setOnboardMessage] = useState(business.onboardMessage || "");


  return (
    <Modal 
    open={modalOpen}
    onClose={() => toggleBusinessModal(false)}
  >
    <Fade in={modalOpen}>
      <Card className={styles.modal}>
        <CardHeader
            title={business.businessName}
            subheader={business.address}
            action={
              <CancelIcon onClick={() => toggleBusinessModal(false)}>
                <EditIcon/>
              </CancelIcon>
            }
          />
        <CardContent className={styles.cardContent}>
          <MessageInputForm
            onUpdatePresetMessages={setPresetMessages}
            onUpdateOnboardingMessage={setOnboardMessage}
            presetMessages={presetMessages}
            onboardingMessage={onboardMessage}
          />
          <Button 
            className={styles.button}
            onClick={() => updateBusiness({
              ...business, 
              presetMessages: presetMessages,
              onboardMessage: onboardMessage,
            })}>
            Save
          </Button>
        </CardContent>
      </Card>
    </Fade>
</Modal>   
  );
}

export default BusinessModal;
