import React, { ChangeEvent, useState } from 'react';

import { Card, CardContent, CardHeader, createStyles, Fade, Grid, IconButton, makeStyles, Modal, Theme, Button, InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

import { API } from "aws-amplify";

import { MessageInputForm } from './addVendor/MessageInputForm';
import { SendMessage } from '../../accessor/Message';

interface IVendorModal {
  vendor: Vendor;
  vendorState: {[key:string]: boolean};
  toggleVendorModal: (placeId: string, isOpen: boolean) => void;
  updateVendor: (updatedVendor: Vendor) => void;
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
    backgroundColor: "#49ABAA",
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

const VendorModal: React.FC<IVendorModal> = props => {
  
  const { vendor, vendorState, toggleVendorModal, updateVendor } = props;

  const styles = useStyles();


  const [selectedMessage, setSelectedMessage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [presetMessages, setPresetMessages] = useState<string[]>(vendor.presetMessages || []);
  const [onboardMessage, setOnboardMessage] = useState(vendor.onboardMessage || "");

  const selectedMessageChanged = (event: ChangeEvent<{value: unknown}>) => setSelectedMessage(event.target.value as number);

  async function runCampaign(index: number): Promise<void> {
    setLoading(true);
    const message = presetMessages[index];
    console.log(message);
    const messageId = SendMessage(vendor.placeId, message, undefined)
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
        title={vendor.vendorName}
        subheader={vendor.primaryAddress}
        action={
          <IconButton onClick={() => toggleVendorModal(vendor.placeId, true)}>
            <EditIcon/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={1}> 
          <Grid item xs={4}>
            Onboard message: {vendor.onboardMessage}
          </Grid>
          {vendor.presetMessages &&
            vendor.presetMessages.map((message, i) => 
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
            {vendor.presetMessages &&
              vendor.presetMessages.map((message, i) => 
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
            open={vendorState[vendor.placeId]}
            onClose={() => toggleVendorModal(vendor.placeId, false)}
          >
            <Fade in={vendorState[vendor.placeId]}>
              <Card className={styles.modal}>
                <CardHeader
                    title={vendor.vendorName}
                    subheader={vendor.primaryAddress}
                    action={
                      <CancelIcon onClick={() => toggleVendorModal(vendor.placeId, false)}>
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
                    onClick={() => updateVendor({
                      ...vendor, 
                      presetMessages: presetMessages,
                      onboardMessage: onboardMessage,
                    })}>
                    Save
                  </Button>
                </CardContent>
              </Card>
            </Fade>
        </Modal>          
      </CardContent>
    </Card>
  );
}

export default VendorModal;