import React from 'react';
import { animated, useSpring } from 'react-spring';
import Background from "../assets/img/brand/vendorbackground.jpg";
import LogoWhite from "../assets/img/brand/Savour_White.png";
import { 
  Card, 
  CardContent, 
  Grid,
  makeStyles, 
  createStyles, 
  Theme, 
  TextField,
  CardMedia,
  Typography,
  Button,
  Dialog
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(3),
      display: "inline-block",
    },
    root: {
      textAlign: "center",
      padding: theme.spacing(1),
      backgroundImage: `url(${Background})`,
      position: 'fixed',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
    },
    img: {
      width: "100%",
      height: 125,
      backgroundColor: "#49ABAA",
    },
  }),
);
const ResetAccount: React.FC = () => {

  const styles = useStyles();
  const springProps = useSpring({opacity: 1, from: {opacity: 0}});

  return(
    <animated.div className={styles.root} style={springProps}>
      <Card className={styles.card}>
      <h1>Reset Account</h1>
      <CardMedia
          className={styles.img}
          image={LogoWhite}
          title="logo"
        />
      </Card>
    </animated.div>
  );
}

export default ResetAccount;