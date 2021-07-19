import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { 
  createStyles, 
  makeStyles, 
  Theme, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  InputAdornment
} from "@material-ui/core";

import Business, { SubscriberInfo } from "../../model/business";
import Campaign from "../../model/campaign";
import { CreateCampaignRequest, CreateCampaign } from "../../accessor/Message";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { COLORS } from "../../constants/Constants";
import { secondsToFuzzy } from '../../utils/customHooks/timeUtils';
import { numberToCurrency } from '../../utils/formatters/currencyFormatter';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    actionButton: {
      backgroundColor: COLORS.primary.light,
      color: "white",
      margin: theme.spacing(2),
    },
    formFields: {
      margin: '25px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '75%',
    },
    halfFormField: {
      margin: theme.spacing(1),
      width: '45%',
    },
    fullFormField: {
      margin: theme.spacing(2),
      width: '90%',
    }
  })
);

enum MessageTabs {
  PRESELECTED = "0",
  CUSTOM = "1"
}

interface IAddCampaignModal {
  width: any;
  handleModalClose: () => void;
  businesses: Array<Business>;
  selectedBusiness: Business;
  addCampaign: (campaign: Campaign) => void;
  setBusinesses: (business: Business[]) => void;
}

const AddCampaignModal: React.FC<IAddCampaignModal> = props => {
  const { handleModalClose, businesses, addCampaign } = props;

  const [loading, setIsLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(props.selectedBusiness);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [campaignName, setCampaignName] = useState<string | undefined>();
  const [messageUrl, setMessageUrl] = useState<string | undefined>();
  const [preselectMessage, setPreselectMessage] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string | undefined>();

  const [selectedTab, setSelectedTab] = useState(MessageTabs.PRESELECTED as string);
  const styles = useStyles();

  const handleBusinessSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    const business = event.target.value as Business;
    console.log(business);
    setSelectedBusiness(business);
  };

  const handleDateChange = (date: Date | null) => setSelectedDate(date);
  const handleMessageUrlChange = (event: React.ChangeEvent<{ value: string }>) => setMessageUrl(event.target.value);
  const handleCampaignNameChange = (event: React.ChangeEvent<{ value: string }>) => setCampaignName(event.target.value);

  const getMessageOptions = (business: Business) => {
    const messageOptions = business.presetMessages.map((message: string, index: number) => (
      <MenuItem value={message} key={index}>
        {message}
      </MenuItem>
    ));

    messageOptions.push(
      <MenuItem value={business.onboardMessage} key={messageOptions.length}>
        {business.onboardMessage}
      </MenuItem>
    );

    return messageOptions
  }

  const costPerMessage = 0.02;
  const perMessageCost = numberToCurrency(costPerMessage);
  const subscriberCount = useMemo(() => {
    if (selectedBusiness.subscriberMap) {
      let subscribedUsers = Object.values(selectedBusiness.subscriberMap).filter((v: SubscriberInfo) => v.subscribed);
      return subscribedUsers.length;
    }
    return 0;
  }, [selectedBusiness]);

  const totalCost = useMemo(() => {
    return numberToCurrency(subscriberCount * costPerMessage);
  }, [subscriberCount])

  const estimatedMessageTime = useMemo(() => {
    //based on ~1 message per second spec from Twilio
    return secondsToFuzzy(subscriberCount);
  }, [subscriberCount])

  const createCampaign = useCallback(async () => {
    setIsLoading(true);

    if (!campaignName) {
      alert("Please enter a campaign name");
      setIsLoading(false);
      return;
    }

    if (!selectedBusiness) {
      alert("Please select a business for the campaign");
      setIsLoading(false);
      return;
    }

    if (selectedTab === MessageTabs.PRESELECTED && !preselectMessage) {
      alert("Please select a message for the campaign");
      setIsLoading(false);
      return;
    }

    if (selectedTab === MessageTabs.CUSTOM && !customMessage) {
      alert("Please enter a message for the campaign");
      setIsLoading(false);
      return;
    }

    if (!selectedDate) {
      alert("Please select a start date for the campaign");
      setIsLoading(false);
      return;
    }

    const createCampaignRequest: CreateCampaignRequest = {
      message: selectedTab === MessageTabs.PRESELECTED ? preselectMessage! : customMessage!!,
      campaignName,
      link: messageUrl ? "https://" + messageUrl : undefined,
      businessId: selectedBusiness!.id,
      campaignDateTimeUtc: selectedDate!.toISOString(),
    };

    CreateCampaign(createCampaignRequest).then((campaign: Campaign) => {
      addCampaign(campaign);
      setIsLoading(false);
      handleModalClose();
    }).catch((error) => {
      console.log(error);
      alert("Sorry, your campaign could not be created");
    });
  }, [selectedBusiness, selectedDate, messageUrl, preselectMessage, customMessage, campaignName, addCampaign, handleModalClose, selectedTab]);

  const onTabChange = (_event: ChangeEvent<{}>, value: string) => {
    setSelectedTab(value);
  }

  const handleCustomMessageChange = (event: React.ChangeEvent<{ value: string }>) => setCustomMessage(event.target.value);
  const handlePresetMessageChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => setPreselectMessage(event.target.value as string);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog 
        onClose={handleModalClose} 
        open
        fullScreen={!isWidthUp('md', props.width)}
        fullWidth={isWidthUp('md', props.width)}>
        <DialogTitle className={styles.root} disableTypography>
          <Typography variant="h4">
            Create a campaign
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Campaign name (this is not shown to subscribers)"
            variant="outlined"
            value={campaignName}
            onChange={handleCampaignNameChange}
            className={styles.fullFormField}/>
          <FormControl 
            variant="outlined"
            className={styles.fullFormField}>
            <InputLabel id="business-dropdown-label">Business</InputLabel>
            <Select
              value={selectedBusiness}
              onChange={handleBusinessSelection}
              label="Business">
              {businesses.map((business: Business) => (
                <MenuItem
                  value={business as any}
                  key={business.id}>
                  {business.businessName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TabContext value={selectedTab}>
            <TabList 
              onChange={onTabChange}
              variant="fullWidth">
              <Tab value={MessageTabs.PRESELECTED} label="Preset messages"  />
              <Tab value={MessageTabs.CUSTOM} label="Custom"  />
            </TabList>
            <TabPanel value={MessageTabs.PRESELECTED}>
              <FormControl 
                className={styles.fullFormField} 
                variant="outlined">
                <InputLabel id="business-dropdown-label">Messages</InputLabel>
                <Select
                  value={preselectMessage}
                  onChange={handlePresetMessageChange}
                  label="Select preset message">
                  {selectedBusiness 
                    ? getMessageOptions(selectedBusiness)
                    : null
                  }
                </Select>
              </FormControl>
            </TabPanel>
            <TabPanel  value={MessageTabs.CUSTOM}>
              <TextField
                id="outlined-multiline-static"
                label="Campaign message (limit 100 characters)"
                multiline
                rows={4}
                defaultValue=""
                value={customMessage}
                onChange={handleCustomMessageChange}
                variant="outlined"
                className={styles.fullFormField}
              />
              <TextField
                label="Web URL (optional)"
                value={messageUrl}
                onChange={handleMessageUrlChange}
                variant="outlined"
                className={styles.fullFormField}
                InputProps={{
                  startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                }}
              />
            </TabPanel>
          </TabContext>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            className={styles.halfFormField}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            fullWidth
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            className={styles.halfFormField}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
            fullWidth
          />
          <Typography variant="body1">
            Cost to run campaign: {subscriberCount} (subscribers) x {perMessageCost} = {totalCost}
          </Typography>
          <Typography variant="body1">
            Time to run campaign: {estimatedMessageTime}
          </Typography>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleModalClose}>
                Cancel
            </Button>
            <Button
              disabled={loading || subscriberCount === 0}
              variant="contained"
              className={styles.actionButton}
              onClick={createCampaign}>
                Launch campaign
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </MuiPickersUtilsProvider>

  );
};

export default withWidth()(AddCampaignModal);