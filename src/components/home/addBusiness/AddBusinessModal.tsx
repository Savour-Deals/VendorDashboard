import React, { 
  ChangeEvent, 
  useState, 
  useContext
} from "react";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  createStyles, 
  Grid, 
  IconButton, 
  Button, 
  makeStyles, 
  Modal, 
  TextField, 
  Theme, 
  List, 
  ListItem, 
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';

import { CardElement, injectStripe } from "react-stripe-elements";

import Loader from "react-loader-spinner";
import { v4 as uuidv4 } from 'uuid';

import { MessageInputForm } from "./MessageInputForm";
import { BusinessSearchBox } from "./BusinessSearchBox";
import { UserContext } from "../../../auth/UserContext";
import { CreateNumber } from "../../../accessor/Message";
import { CreateBusiness } from "../../../accessor/Business";
import { AddBusiness } from "../../../accessor/BusinessUser";
import { CreateSubscription } from "../../../accessor/Payment";
import Business, { SubscriberInfo, Campaign } from "../../../model/business";
import Fade from "../../common/Fade";



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

interface IAddBusinessModal {
  open: boolean;
  isLoading: boolean;
  handleClose: () => void;
  addBusiness: (business: Business) => void;
  stripe?: any;
  elements?: any;
}


const AddBusinessModal: React.FC<IAddBusinessModal> = props => {

  const { open, handleClose, stripe, addBusiness, elements } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [presetMessages, setPresetMessages] = useState<string[]>([""]); //always start with at least one blank preset
  const [onboardMessage, setOnboardMessage] = useState("");
  const [cardName, setCardName] = useState("");
  const styles = useStyles();
  const userContext: IUserContext = useContext(UserContext);
  
  const createBusiness = async () => {
    const cardElement = elements.getElement('card');
    const { paymentMethod, error } = await await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: userContext.user.email
      },
    });

    if (error) {
      alert("There was an error processing your payment.");
      return;
    }

    const businessId = uuidv4();
    
    const business = {
      id: businessId,
      businessName,
      address,
      presetMessages,
      onboardMessage,
      subscriberMap: new Map<string, SubscriberInfo>(),
      campaignsMap: new Map<string, Campaign>(),
    };

    // update app state 
    addBusiness(business);

    return Promise.all([
      CreateBusiness(business),
      CreateNumber(businessId),
      AddBusiness(userContext.user.username, businessId),

    ]).then(() => {
      setIsLoading(false);
      handleClose();
      return CreateSubscription(businessId, {
        email: userContext.user.attributes.email,
        name: businessName,
        paymentMethod: paymentMethod.id,
        subscriptions: {
          recurring: "price_1IR58xFdZgF3d0Xe5IaMr0KY",
          usage: "price_1IV8SPFdZgF3d0XeK1qX4bW1",
        }
      });
    }).catch((e) => {
      console.log(e)
      alert("An error occured while creating your account");
      setIsLoading(false);
      handleClose();  
      return;
    });
  }

  function businessNameChange(event: ChangeEvent<HTMLInputElement>) {
    setBusinessName(event.target.value);
  }

  function addressChange(event: ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  function cardNameChange(event: ChangeEvent<HTMLInputElement>) {
    setCardName(event.target.value);
  }
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Card className={styles.card}>
          <CardHeader
            action={
              <IconButton onClick={handleClose}>
                <CloseIcon/>
              </IconButton>
            }/>
          <CardContent className={styles.cardContent} >
            <Dialog open={isLoading}>
              <Loader type="ThreeDots" color="#49ABAA" height={100} width={100}/>
            </Dialog>
            <form>
              <Typography variant="h1">
                Add Business
              </Typography>
              <div>
                <Grid container spacing={4} className={styles.formFields}>
                  <List className={styles.inputList}>
                    <ListItem>                  
                      <Typography variant="h2">
                        Business Info
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant="body1">
                        Search for a business below or manually enter your business name and address.
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <BusinessSearchBox 
                        setPrimaryAddress={setAddress}
                        setVendorName={setBusinessName}/>
                    </ListItem>
                    <ListItem>
                      <TextField
                        className={styles.textInput}
                        label="Business Name"
                        value={businessName}
                        variant="outlined"
                        onChange={businessNameChange}
                      />  
                    </ListItem>
                    <ListItem>
                      <TextField
                        className={styles.textInput}
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={addressChange}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid container spacing={4} className={styles.formFields}>
                  <List className={styles.inputList}>
                    <ListItem>
                      <Typography variant="h2">
                        Setup Messages
                      </Typography>
                    </ListItem>
                    <MessageInputForm
                      onUpdatePresetMessages={setPresetMessages}
                      onUpdateOnboardingMessage={setOnboardMessage}
                      presetMessages={presetMessages}
                      onboardingMessage={onboardMessage}/>
                  </List>
                </Grid>
                <Grid container spacing={4}  className={styles.formFields}>
                  <ListItem>
                    <Typography variant="h2">
                      Billing Info
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      Enter your business billing information. Our payment structure is simple. You pay:
                    </Typography>
                  </ListItem>
                  <ListItem>
                  <List>
                      <ListItem>
                        <Typography variant="body1">
                          &#8226; $40/month subscription fee
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1">
                          &#8226; $0.01 for every message sent
                        </Typography>
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                      <TextField
                        variant="outlined"
                        label="Name on Card"
                        fullWidth
                        onChange={cardNameChange}
                      />
                  </ListItem>
                  <ListItem>
                    <CardElement
                      className={styles.cardField}
                      style={{
                        base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                      }}/>
                  </ListItem>
                </Grid>
                <Button 
                  variant="contained" 
                  disabled={isLoading}  
                  className={styles.button} 
                  onClick={createBusiness}>
                  Create Business                 
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fade> 
    </Modal>
  );
}

export default injectStripe(AddBusinessModal);