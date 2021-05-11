import React, { ChangeEvent, useCallback, useState } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import Loader from "react-loader-spinner";
import Business, { Campaign } from "../../../model/business";
import { UpdateBusiness } from "../../../accessor/Business";
import { CreateCampaignRequest, CreateCampaign } from "../../../accessor/Message";

import { v4 as uuidv4 } from 'uuid';


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    },
    formControl: {
      minWidth: 300,
    },
    inputGrid: {
      margin: theme.spacing(16),
    },
    textArea: {
      minWidth: "80%",
    }
  })
);


interface IAddCampaignModal {
  modalOpen: boolean;
  handleModalClose: () => void;
  businesses: Array<Business>;
  addCampaign: (business: Business, campaign: Campaign) => Promise<void>;
  setBusinesses: (business: Business[]) => void;

}

const AddCampaignModal: React.FC<IAddCampaignModal> = props => {
  const { modalOpen, handleModalClose, businesses, setBusinesses } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [campaignName, setCampaignName] = useState("");
  const [messageUrl, setMessageUrl] = useState("");
  const [message, setMessage] = useState("");


  const styles = useStyles();

  const handleBusinessSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    const business = event.target.value as Business;
    setSelectedBusiness(business);
  };

  const handleDateChange = (date: Date | null) => setSelectedDate(date);
  const handleMessageUrlChange = (event: React.ChangeEvent<{ value: string }>) => setMessageUrl(event.target.value);
  const handleCampaignNameChange = (event: React.ChangeEvent<{ value: string }>) => setCampaignName(event.target.value);

  const getMessageOptions = (business: Business) => {
    const messageOptions = business.presetMessages.map((message: string, index: number) => (
        <MenuItem
        value={message}
        key={index}
        >
          {message}
        </MenuItem>
      )
    );

    messageOptions.push(
      <MenuItem
      value={business.onboardMessage}
      >
        {business.onboardMessage}
      </MenuItem>
    );

    return messageOptions
  }
  const createCampaign = useCallback(async () => {
    setIsLoading(true);
    if (!selectedBusiness) {
      alert("Please select a business for the campaign");
      return;
    }

    if (!selectedDate) {
      alert("Please select a start date for the campaign");
      return;
    }

    const campaign: Campaign = {
      businessId: selectedBusiness!.id,
      campaignName,
      startDateTime: selectedDate!.toISOString(),
      message,
      textCount: 0,
      messageUrl
    };
    
    const createCampaignRequest: CreateCampaignRequest = {
      message,
      link: messageUrl,
      businessId: selectedBusiness!.id,
      campaignDateTimeUtc: selectedDate!.toUTCString(),
    };

    const business = Object.assign({}, selectedBusiness);
    if (!business.campaignsMap) business.campaignsMap = new Map<string, Campaign>();
    const campaignId = uuidv4();
    business.campaignsMap!.set(campaignId, campaign);
    console.log(business);


    try {
      CreateCampaign(createCampaignRequest);
    } catch (error) {
      alert("Sorry, your campaign could not be created");
    }
    try {
      const res = await UpdateBusiness(business);

      console.log(res);
    } catch (e) {
      alert("Sorry, your campaign could not be created");
      setIsLoading(false);

    }

    // update current business object 
    const updatedBusinesses = businesses.map((oldBusiness: Business) =>  oldBusiness.id === business.id ? business : oldBusiness);

    setBusinesses(updatedBusinesses);
    setIsLoading(false);

  }, []);

  const handleMessageChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => setMessage(event.target.value as string);
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            <Typography variant="h2">
                Create a Campaign
              </Typography>
              <Container maxWidth="lg" className={styles.formFields}>
              
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Campaign Name"
                      variant="outlined"
                      value={campaignName}
                      onChange={handleCampaignNameChange}
                      className={styles.formControl}
                    />
                  </Grid> 
                  <Grid item xs={6}>
                    <FormControl className={styles.formControl} variant="outlined">
                      <InputLabel id="business-dropdown-label">Business</InputLabel>
                      <Select
                        value={selectedBusiness}
                        onChange={handleBusinessSelection}
                        label="Business"
                      >
                        {businesses.map((business: Business) => (
                          <MenuItem
                            value={business as any}
                            key={business.id}
                          >
                            {business.businessName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={styles.formControl} variant="outlined">
                      <InputLabel id="business-dropdown-label">Messages</InputLabel>
                      <Select
                        value={message}
                        onChange={handleMessageChange}
                        disabled={selectedBusiness === null}
                        label="Messages"
                      >
                        {selectedBusiness 
                          ? getMessageOptions(selectedBusiness)
                          : null
                        }
                      </Select>
                    </FormControl>
                  </Grid> 
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Campaign message (limit 100 characters)"
                      multiline
                      rows={4}
                      defaultValue=""
                      value={message}
                      onChange={handleMessageChange}
                      variant="outlined"
                      className={styles.textArea}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Link included in message"
                      value={messageUrl}
                      onChange={handleMessageUrlChange}
                      variant="outlined"
                      className={styles.textArea}
                    />
                  </Grid>
                  <Grid item xs={12} container spacing={1}>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        className={styles.formControl}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        className={styles.formControl}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid> 
                    <Grid item xs={8}>
                      <Typography variant="h6">
                        Cost to run campaign: $$
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                          variant="contained"
                          className={styles.button}
                          onClick={createCampaign}
                        >
                          Launch Campaign
                        </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            
              <Dialog open={isLoading}>
                <Loader type="ThreeDots" color="#49ABAA" height={100} width={100}/>
              </Dialog>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </MuiPickersUtilsProvider>

  );
};

export default AddCampaignModal;