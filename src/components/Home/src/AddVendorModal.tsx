import React, { useState } from "react";
import { Modal, Card, CardContent, makeStyles, createStyles, Theme } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import GoogleMapsReact from "google-map-react";
import { SearchBox } from "./Searchbox";

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

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade
        in={open}
      >
      
        <Card className={styles.card}>
          <CardContent>
            <form>
              <h1>Add Business</h1>
              <div style={{ height: '60vh', width: '100%' }}>

                <GoogleMapsReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
                    libraries: ['places', 'drawing'],

                  }}
                  defaultCenter={coords}
                  defaultZoom={defaultProps.zoom}
                  yesIWantToUseGoogleMapApiInternals
                  options={{fullscreenControl: true, mapTypeControl: true}}
                  onGoogleApiLoaded={({map, maps}) => {
                      console.log(map);
                      console.log(maps);
                      setMapInstance(map);
                      setMapsApi(maps);
                      setMapsApiLoaded(true);
                    }
                  }
                >
                  {mapsApiLoaded && <SearchBox map={mapInstance!} mapsApi={mapsApi!}/>}
                </GoogleMapsReact>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fade> 
    </Modal>
  );
}