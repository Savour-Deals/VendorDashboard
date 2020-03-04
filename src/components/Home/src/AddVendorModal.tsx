import { Card, CardContent, CardHeader, createStyles, Grid, IconButton, Button, makeStyles, Modal, TextField, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import GoogleMapsReact from "google-map-react";
import React, { ChangeEvent, createRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { SearchBox } from "./Searchbox";

interface IAddVendorModal {
  open: boolean;
  handleClose: () => void;
  addVendor: (vendor: Vendor) => void;
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
      height: "90%",
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
    root: {
      textAlign: "center",
      padding: theme.spacing(1),
      position: 'fixed',
      width: '100%',
      height: '100%',
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
    modal: {
      overflow: 'scroll',
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

export const AddVendorModal: React.FC<IAddVendorModal> = props => {

  const { open, handleClose } = props;
  const [coords, setCoords] = useState<MapCoordinates>({
    lat: 59.95,
    lng: 30.33
  });
  const [mapsApiLoaded, setMapsApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [vendorName, setVendorName] = useState("Select a business from the map above");
  const [placeId, setPlaceId] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("Select a business from the map above");
  const [locationSelected, setLocationSelected] = useState(false);
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [onboardDeal, setOnboardDeal] = useState("");
  const [doubleClickDeal, setDoubleClickDeal] = useState("");
  const [twilioNumber, setTwilioNumber] = useState("");

  const styles = useStyles();
  
  let defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  const searchBoxProps = {
    setVendorName,
    setPlaceId,
    setPrimaryAddress,
    setSecondaryAddress,
  }

  const handleVendorNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    
  }

  const handlePrimaryAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    
  }

  const createVendor = () => {
    const vendor: Vendor = {
      placeId,
      vendorName,
      primaryAddress
    }
  }

  const successCallback = (position: Position) => {
    setCoords({lat: position.coords.latitude, lng: position.coords.longitude});
  }

  const errorCallback = () => {

  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  const searchBar = createRef<HTMLInputElement>();

  return (
    <Modal open={open} className={styles.modal} onClose={handleClose}>
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
            <form className={styles.modal}>
              <h1>Add Business</h1>
              <div style={{ height: '45vh ', width: '100%' }}>
                <GoogleMapsReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
                    libraries: ['places', 'drawing'],
                  }}
                  center={coords}
                  defaultZoom={defaultProps.zoom}
                  yesIWantToUseGoogleMapApiInternals
                  options={{fullscreenControl: true}}
                  onGoogleApiLoaded={({map, maps}) => {
                    map.controls[maps.ControlPosition.TOP_LEFT].push(searchBar.current);
                    setMapInstance(map);
                    setMapsApi(maps);
                    setMapsApiLoaded(true);
                  }}
                > 
                </GoogleMapsReact>
                <div ref={searchBar}>
                  {mapsApiLoaded && <SearchBox map={mapInstance!} mapsApi={mapsApi!} {...searchBoxProps}/>}
                </div>
              </div>
              <br></br>
              <div>
                <Grid container spacing={2} direction="row">
                  <Grid container item xs={6} spacing={4} className={styles.inputGrid} direction="column">
                    <Grid item xs={3}>
                      <TextField
                        className={styles.textInput}
                        label="Business Name"
                        value={vendorName}
                        disabled={locationSelected}
                        onChange={handleVendorNameChange}
                        
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        className={styles.textInput}
                        label="Address"
                        value={primaryAddress}
                        disabled={locationSelected}
                        onChange={handlePrimaryAddressChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        className={styles.textInput}
                        label="Address"
                        value={primaryAddress}
                        disabled={locationSelected}
                        onChange={handlePrimaryAddressChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={6} spacing={4} className={styles.inputGrid} direction="column">
                    <Grid item xs={3}>
                      <TextField
                        className={styles.textInput}
                        label="Business Name"
                        value={vendorName}
                        disabled={locationSelected}
                        onChange={handleVendorNameChange}
                        
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        className={styles.textInput}
                        label="Address"
                        value={primaryAddress}
                        disabled={locationSelected}
                        onChange={handlePrimaryAddressChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        className={styles.textInput}
                        label="Address"
                        value={primaryAddress}
                        disabled={locationSelected}
                        onChange={handlePrimaryAddressChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Button 
                  variant="contained"   
                  className={styles.button} 
                  onClick={createVendor}>
                    Create
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fade> 
    </Modal>
  );
}