import { Card, CardContent, CardHeader, createStyles, Grid, IconButton, Button, makeStyles, Modal, TextField, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { ChangeEvent, createRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { SearchBox } from "./Searchbox";
import { CardElement, injectStripe } from "react-stripe-elements";
import { API } from "aws-amplify";

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
  const [locationSelected, setLocationSelected] = useState(false);
  const [onboardDeal, setOnboardDeal] = useState("");
  const [singleClickDeal, setSingleClickDeal] = useState("");
  const [doubleClickDeal, setDoubleClickDeal] = useState("");
  const [twilioNumber, setTwilioNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [cardName, setCardName] = useState("");
  const styles = useStyles();


  const searchBoxProps = {
    setVendorName,
    setPlaceId,
    setPrimaryAddress,
  }

  const createVendor = async () => {
    const vendor: Vendor = {
      placeId,
      vendorName,
      primaryAddress
    }

    setIsProcessing(true);

    const { token, error } = await stripe.createToken({ name: cardName});
    await API.get(
      "twilio",
      "",
      {}
    );
    await API.post(
      "businesses",
      "/businesses",
      {
        
      }
    );
    console.log(token);
    addVendor(vendor);
    handleClose();
  }

  function vendorNameChange(event: ChangeEvent<HTMLInputElement>) {
    const vendorName = event.target.value;

    setVendorName(vendorName);
  }

  function primaryAddressChange(event: ChangeEvent<HTMLInputElement>) {
    const primaryAddress = event.target.value;

    setPrimaryAddress(primaryAddress);
  }

  function onboardDealChange(event: ChangeEvent<HTMLInputElement>) {
    const onboardDeal = event.target.value;

    setOnboardDeal(onboardDeal);
  }

  function doubleClickDealChange(event: ChangeEvent<HTMLInputElement>) {
    const doubleClickDeal = event.target.value;
    
    setDoubleClickDeal(doubleClickDeal);
  }

  function singleClickDealChange(event: ChangeEvent<HTMLInputElement>) {
    const singleClickDeal = event.target.value;
    
    setSingleClickDeal(singleClickDeal);
  }

  function cardNameChange(event: ChangeEvent<HTMLInputElement>) {
    const cardName = event.target.value;

    setCardName(cardName);
  }

  const searchBar = createRef<HTMLInputElement>();

  return (
      <Modal open={open} onClose={handleClose}>
        <Fade
          in={open}
        >
        
          <Card className={styles.card}>
            <CardHeader
              action={
                <IconButton onClick={handleClose}>
                  <CloseIcon/>
                </IconButton>
              }
            />
            <CardContent className={styles.cardContent} >
              <form>
                <h1>Add Business</h1>
                <div>

                  <div ref={searchBar}>
                    <SearchBox {...searchBoxProps}/>
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
                          id="vendorName"
                          onChange={vendorNameChange}

                        />
                      </Grid>
                      <Grid item xs={TEXT_INPUT_SIZE}>
                        <TextField
                          className={styles.textInput}
                          label="Address"
                          value={primaryAddress}
                          id="primaryAddress"
                          onChange={primaryAddressChange}

                        />
                      </Grid>
                      <Grid item xs={TEXT_INPUT_SIZE}>
                        <TextField
                          className={styles.textInput}
                          label="Onboard Deal"
                          value={onboardDeal}
                          id="primaryAddress"
                          onChange={onboardDealChange}

                        />
                      </Grid>
                      <Grid item xs={TEXT_INPUT_SIZE}>
                        <TextField
                          className={styles.textInput}
                          label="Single Click Deal"
                          value={singleClickDeal}
                          id="primaryAddress"
                          onChange={singleClickDealChange}

                        />
                      </Grid>
                      <Grid item xs={TEXT_INPUT_SIZE}>
                        <TextField
                          className={styles.textInput}
                          label="Double Click Deal"
                          value={doubleClickDeal}
                          id="primaryAddress"
                          onChange={doubleClickDealChange}
                        />
                      </Grid>
                  </Grid>
                  <h2>
                    Billing Info
                  </h2>
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
                      onChange={e => setIsCardComplete(e.complete)}
                      style={{
                        base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                      }}
                    />
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