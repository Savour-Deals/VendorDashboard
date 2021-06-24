import React, { 
  useState, 
  useContext,
  useCallback
} from "react";

import { 
  createStyles, 
  Grid, 
  Button, 
  makeStyles, 
  Theme, 
  List, 
  ListItem, 
  Typography,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';

import { Elements, injectStripe, StripeProvider } from "react-stripe-elements";

import Loader from "react-loader-spinner";
import { v4 as uuidv4 } from 'uuid';

import { UserContext } from "../../../auth/UserContext";
import { CreateNumber } from "../../../accessor/Message";
import { CreateBusiness } from "../../../accessor/Business";
import { CreateSubscription } from "../../../accessor/Payment";
import Business, { SubscriberInfo } from "../../../model/business";
import Campaign from "../../../model/campaign";
import { COLORS } from "../../../constants/Constants";
import config from "../../../config";
import { UpdateBusinessUser } from "../../../accessor/BusinessUser";
import BusinessUser from "../../../model/businessUser";
import { BillingInfoForm } from "../../common/forms/BillingInfoForm";
import { BusinessInfoForm } from "../../common/forms/BusinessInfoForm";
import { MessageInputForm } from "../../common/forms/MessageInputForm";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      maxWidth: "70%"
    },
    card: {
      overflow: 'scroll',
      display: "inline-block",
    },
    inputList: {
      flexGrow: 1
    },
    cardContent: {
      alignItems: 'center',
    },
    button: {
      backgroundColor: COLORS.primary.light,
      color: "white",
      margin: theme.spacing(2),
    },
    formFields: {
      margin: '25px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '75%',
      outline: '1px solid slategrey',
      boxShadow: '5px 5px 5px #888888'
    },
    dialogCustomizedWidth: {
      'max-width': '80%'
    }
  })
);

interface IAddBusinessModal {
  businessUser: BusinessUser;
  stripe?: any;
  elements?: any;
  onClose: (business?: Business) => void;
  onError: (error: string) => void;
}

const _AddBusinessModal: React.FC<IAddBusinessModal> = props => {
  const styles = useStyles();

  const { 
    businessUser,
    stripe,
    elements,
    onClose, 
    onError,
  } = props;


  const [isLoading, setIsLoading] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");

  const [presetMessages, setPresetMessages] = useState<string[]>([""]); //always start with at least one blank preset
  const [onboardMessage, setOnboardMessage] = useState("");
  
  const userContext: IUserContext = useContext(UserContext);

  const [cardName, setCardName] = useState<string | undefined>();
  const [cardElement, setCardElement] = useState<stripe.elements.Element | undefined>();
  const [paymentError, setPaymentError] = useState<string>();

  const onCardChanged = useCallback((name: string, element?: stripe.elements.Element) => {
    setCardName(name);
    setCardElement(element);
  }, []);

  const onBusinessInfoChange = useCallback((name: string, address: string) => {
    setBusinessName(name);
    setAddress(address);
  }, []);
  
  
  const createBusiness = async () => {
    if (!cardElement || !cardName || !businessName || !address || !onboardMessage || !presetMessages) {
      return 
    }

    setIsLoading(true);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: userContext.user.email,
        // name: cardName,
      },
    });

    if (error) {
      setPaymentError("There was an error processing your payment.");
      setIsLoading(false);
      return;
    }

    const business = {
      id: uuidv4(),
      businessName,
      address,
      presetMessages,
      onboardMessage,
      subscriberMap: new Map<string, SubscriberInfo>(),
      campaignsMap: new Map<string, Campaign>(),
    };
    
    return Promise.all([
      CreateBusiness(business),
      CreateNumber(business.id),
    ]).then(() => {
      return Promise.all([
        CreateSubscription(business.id, {
          email: userContext.user.attributes.email,
          name: businessName,
          paymentMethod: paymentMethod.id,
          subscriptions: {
            recurring: "price_1IR58xFdZgF3d0Xe5IaMr0KY",
            usage: "price_1IV8SPFdZgF3d0XeK1qX4bW1",
          }
        }),
        UpdateBusinessUser({
          ...businessUser,
          businesses: [...businessUser.businesses, business.id]
        }),
      ]); 
    }).then(() => {
      setIsLoading(false);
      onClose(business);
    }).catch((e) => {
      console.log(e)
      setIsLoading(false);
      onError(`An error occured while creating ${business.businessName}`);  
    });
  }

  return (
    <Dialog 
      classes={{ paperFullWidth: styles.dialogCustomizedWidth }}
      onClose={() => onClose()} 
      open
      fullWidth>
      <DialogTitle className={styles.root} disableTypography>
        <Typography variant="h2">
          Create a campaign
        </Typography>
      </DialogTitle>
      <DialogContent className={styles.cardContent} >
        <Dialog open={isLoading}>
          <Loader type="ThreeDots" color={COLORS.primary.light} height={100} width={100}/>
        </Dialog>
        <form>
          <Grid container spacing={4} className={styles.formFields}>
            <BusinessInfoForm
              onChange={onBusinessInfoChange}
            />
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
            <BillingInfoForm
              error={paymentError}
              elements={elements}
              onCardChanged={onCardChanged}
            />
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => onClose()}>
            Cancel
        </Button>
        <Button
          disabled={isLoading}
          variant="contained"
          className={styles.button} 
          onClick={createBusiness}>
          Create Business
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const InternalAddBusinessModal = injectStripe(_AddBusinessModal)

const AddBusinessModal: React.FC<IAddBusinessModal> = props => {
  return (
    <StripeProvider apiKey={config.STRIPE_KEY}>
      <Elements>
        <InternalAddBusinessModal {...props}/>
      </Elements>
    </StripeProvider>
  );
}

export default AddBusinessModal;
