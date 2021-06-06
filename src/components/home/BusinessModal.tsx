import React, { ChangeEvent, useState } from 'react';

import { Card, CardContent, CardHeader, createStyles, Fade, Grid, IconButton, makeStyles, Modal, Theme, Button, InputLabel, Dialog } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

import { SendMessage } from '../../accessor/Message';
import Business from '../../model/business';
import { MessageInputForm } from '../business/addbusiness/MessageInputForm';
import { COLORS } from '../../constants/Constants';
import Loader from 'react-loader-spinner';

interface IBusinessModal {
  business: Business;
  businessState: {[key:string]: boolean};
  toggleBusinessModal: (id: string, isOpen: boolean) => void;
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
  
  const { business, businessState, toggleBusinessModal, updateBusiness } = props;
  const styles = useStyles();

  const [selectedMessage, setSelectedMessage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [presetMessages, setPresetMessages] = useState<string[]>(business.presetMessages || []);
  const [onboardMessage, setOnboardMessage] = useState(business.onboardMessage || "");

  const selectedMessageChanged = (event: ChangeEvent<{value: unknown}>) => setSelectedMessage(event.target.value as number);

  async function runCampaign(index: number): Promise<void> {
    setLoading(true);
    const message = presetMessages[index];
    console.log(message);
    SendMessage(business.id, message, undefined)
    .then((response) => response)
    .catch(() => {
      console.log(`An error occured while trying to initiate your message`);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Card >
      <CardHeader
        title={business.businessName}
        subheader={business.address}
        action={
          <IconButton onClick={() => toggleBusinessModal(business.id, true)}>
            <EditIcon/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={1}> 
          <Grid item xs={4}>
            Onboard message: {business.onboardMessage}
          </Grid>
          {business.presetMessages &&
            business.presetMessages.map((message, i) => 
            <Grid item xs={4}>
              Preset message {i}: {message}
            </Grid>)
          }
        </Grid>
        <FormControl>
          <InputLabel id="deal-select-label">
            Select message
          </InputLabel>
          <Select
            value={selectedMessage}
            onChange={selectedMessageChanged}>
            {business.presetMessages &&
              business.presetMessages.map((message, i) => 
                <MenuItem value={i}>Preset message {i}</MenuItem>)
            }
          </Select>
          <Button 
            variant="contained"   
            className={styles.button} 
            onClick={() => runCampaign(selectedMessage)}>
              Run Deal
          </Button> 
        </FormControl>
          <Modal 
            open={businessState[business.id]}
            onClose={() => toggleBusinessModal(business.id, false)}
          >
            <Fade in={businessState[business.id]}>
              <Card className={styles.modal}>
                <CardHeader
                    title={business.businessName}
                    subheader={business.address}
                    action={
                      <CancelIcon onClick={() => toggleBusinessModal(business.id, false)}>
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
                  <Dialog open={loading}>
                    <Loader type="ThreeDots" color={COLORS.primary.light} height={100} width={100}/>
                  </Dialog>
                </CardContent>
              </Card>
            </Fade>
        </Modal>          
      </CardContent>
    </Card>
  );
}

export default BusinessModal;
