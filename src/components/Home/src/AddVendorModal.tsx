import React, { useState, createRef } from "react";
import { Modal, Card, CardContent, makeStyles, createStyles, Theme, CardHeader, IconButton } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import GoogleMapsReact from "google-map-react";
import { SearchBox } from "./Searchbox";
import CloseIcon from "@material-ui/icons/Close";

interface IAddVendorModal {
  open: boolean;
  handleClose: () => void;
  addVendor: () => void;
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
      margin: theme.spacing(3),
      display: "inline-block",
      width: "80%",
      height: "80%",
    },
    root: {
      textAlign: "center",
      padding: theme.spacing(1),
      position: 'fixed',
      width: '100%',
      height: '100%',
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
  const [vendorName, setVendorName] = useState("");
  const [placeId, setPlaceId] = useState("");
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
          <CardContent>
            <form>
              <h1>Add Business</h1>
              <div style={{ height: '45vh ', width: '100%' }}>

                <GoogleMapsReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
                    libraries: ['places', 'drawing'],
                  }}
                  defaultCenter={coords}
                  defaultZoom={defaultProps.zoom}
                  yesIWantToUseGoogleMapApiInternals
                  options={{fullscreenControl: true}}
                  onGoogleApiLoaded={({map, maps}) => {
                    map.controls[maps.ControlPosition.TOP_LEFT].push(searchBar.current);
                    setMapInstance(map);
                    setMapsApi(maps);
                    setMapsApiLoaded(true);
                    }
                  }
                >


                </GoogleMapsReact>
                <div ref={searchBar}>
                  {mapsApiLoaded && <SearchBox map={mapInstance!} mapsApi={mapsApi!}/>}
                </div>
              </div>
              <div>
                  <h1>
                    Other Info
                  </h1>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fade> 
    </Modal>
  );
}