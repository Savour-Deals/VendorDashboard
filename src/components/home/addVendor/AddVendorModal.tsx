import React, { ChangeEvent, createRef, useState, useContext } from "react";

import { Card, CardContent, CardHeader, createStyles, Grid, IconButton, Button, makeStyles, Modal, TextField, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';

import { animated, useSpring } from "react-spring";
import { CardElement, injectStripe } from "react-stripe-elements";
import Loader from "react-loader-spinner";

import { BusinessSearchBox } from "./BusinessSearchBox";
import { UserContext } from "../../../auth/UserContext";
import { CreateNumber } from "../../../accessor/Message";
import { CreateBusiness } from "../../../accessor/Business";
import { AddBusiness } from "../../../accessor/BusinessUser";

interface IAddVendorModal {
  open: boolean;
  isLoading: boolean;
  handleClose: () => void;
  addVendor: (vendor: Vendor) => void;
  stripe?: any;
}

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

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

// https://material-ui.com/components/modal/#modal
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const layout = useStyles();
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other} className={layout.root}>
      {children}
    </animated.div>
  );
});

const TEXT_INPUT_SIZE = 4;
const AddVendorModal: React.FC<IAddVendorModal> = props => {

  const { open, handleClose, addVendor, stripe } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [onboardDeal, setOnboardDeal] = useState("");
  const [presetDeal1, setPresetDeal1] = useState("");
  const [presetDeal2, setPresetDeal2] = useState("");
  const [presetDeal3, setPresetDeal3] = useState("");
  const [cardName, setCardName] = useState("");
  const styles = useStyles("");
  const userContext: IUserContext = useContext(UserContext);

  const searchBoxProps = {
    setVendorName,
    setPlaceId,
    setPrimaryAddress,
  }
  
  const createVendor = async () => {
    const vendor: Vendor = {
      placeId,
      vendorName,
      primaryAddress,
      presetDeals: [presetDeal1, presetDeal2, presetDeal3],
      onboardDeal,
    }

    const { token, error } = await stripe.createToken({ name: cardName });

    if (error) {
      alert("There was an error processing your payment.");
      return;
    }

    CreateNumber(placeId).then((number) => {
      return CreateBusiness({
        id: placeId,
        businessName: vendorName,
        address: primaryAddress,
        presetDeals: [presetDeal1, presetDeal2, presetDeal3],
        onboardDeal: onboardDeal,
        stripeCustomerId: token.card.id,
        twilioNumber: number,
        subscriberMap: {}
      })
    }).then(() => {
      // identityId I believe is equivalent to userSub 
      // https://stackoverflow.com/questions/42645932/aws-cognito-difference-between-cognito-id-and-sub-what-should-i-use-as-primary
      return AddBusiness(userContext.user.username, placeId);
    }).then((business) => {
      setIsLoading(false);
      addVendor(vendor);
      handleClose();
    }).catch((e) => {
      console.log(e)
      alert("An error occured while creating your account");
      setIsLoading(false);
      handleClose();
      return;
    });
  }

  function vendorNameChange(event: ChangeEvent<HTMLInputElement>) {
    setVendorName(event.target.value);
  }

  function primaryAddressChange(event: ChangeEvent<HTMLInputElement>) {
    setPrimaryAddress(event.target.value);
  }

  function onboardDealChange(event: ChangeEvent<HTMLInputElement>) {
    setOnboardDeal(event.target.value);
  }

  function preset1Change(event: ChangeEvent<HTMLInputElement>) {    
    setPresetDeal1(event.target.value);
  }

  function preset2Change(event: ChangeEvent<HTMLInputElement>) {
    setPresetDeal2(event.target.value);
  }

  function preset3Change(event: ChangeEvent<HTMLInputElement>) {
    setPresetDeal3(event.target.value);
  }

  function cardNameChange(event: ChangeEvent<HTMLInputElement>) {
    setCardName(event.target.value);
  }

  const searchBar = createRef<HTMLInputElement>();

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
              <h1>Add Business</h1>
              <div>
                <div ref={searchBar}>
                  <BusinessSearchBox {...searchBoxProps}/>
                </div>
              </div>
              <br></br>
              <div>
                <h2>
                  Vendor Info
                </h2>
                <Grid container spacing={4} className={styles.formFields}>
                  <Grid item xs={TEXT_INPUT_SIZE}>
                    <TextField
                      className={styles.textInput}
                      label="Business Name"
                      value={vendorName}
                      onChange={vendorNameChange}
                    />
                  </Grid>
                  <Grid item xs={TEXT_INPUT_SIZE}>
                    <TextField
                      className={styles.textInput}
                      label="Address"
                      value={primaryAddress}
                      onChange={primaryAddressChange}
                    />
                  </Grid>
                  <Grid item xs={TEXT_INPUT_SIZE}>
                    <TextField
                      className={styles.textInput}
                      label="Onboard Deal"
                      value={onboardDeal}
                      onChange={onboardDealChange}
                    />
                  </Grid>
                  <Grid item xs={TEXT_INPUT_SIZE}>
                    <TextField
                      className={styles.textInput}
                      label="Preset 3"
                      value={presetDeal1}
                      onChange={preset1Change}
                    />
                  </Grid>
                  <Grid item xs={TEXT_INPUT_SIZE}>
                    <TextField
                      className={styles.textInput}
                      label="Preset 2"
                      value={presetDeal2}
                      onChange={preset2Change}
                    />
                  </Grid>
                  <Grid item xs={TEXT_INPUT_SIZE}>
                    <TextField
                      className={styles.textInput}
                      label="Preset 3"
                      value={presetDeal3}
                      onChange={preset3Change}
                    />
                  </Grid>
                </Grid>
                <h2>Billing Info</h2>
                <Grid container spacing={4}  className={styles.formFields}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Name on Card"
                      fullWidth
                      onChange={cardNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <CardElement
                    className={styles.cardField}
                    style={{
                      base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                    }}/>
                </Grid>
                </Grid>
                <Button 
                  variant="contained"   
                  className={styles.button} 
                  onClick={createVendor}>
                  Create Vendor
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fade> 
    </Modal>
  );
}

export default injectStripe(AddVendorModal);