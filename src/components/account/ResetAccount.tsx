import React, { ChangeEvent, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import Background from "../../assets/img/brand/vendorbackground.jpg";
import LogoWhite from "../../assets/img/brand/Savour_White.png";
import { 
  Card, 
  makeStyles, 
  createStyles, 
  Theme, 
  CardMedia,
  CardContent,
  Button,
} from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { Auth } from "aws-amplify";
import { useHistory } from 'react-router-dom';

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
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: "white",
      margin: theme.spacing(2),
    },
  }),
);
const ResetAccount: React.FC = () => {

  const styles = useStyles();
  const springProps = useSpring({opacity: 1, from: {opacity: 0}});
  const history = useHistory();

  const [email,   setEmail] = useState("");
  
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  async function handleSubmit() {
    try {
      const res = await Auth.forgotPassword(email);
      console.log(res);
      history.push("/login");
    } catch (error) {
      alert(error);
    }
  }

  return(
    <animated.div className={styles.root} style={springProps}>
      <Card className={styles.card}>
      <CardMedia
          className={styles.img}
          image={LogoWhite}
          title="logo"
        />
        <CardContent>
          <TextField
            label="Enter Email"
            type="email"
            onChange={handleEmailChange}
          />
          <Button
              variant="contained"
              className={styles.button}
              onClick={handleSubmit}
            >
              Send Password
            </Button>
        </CardContent>
      </Card>
    </animated.div>
  );
}

export default ResetAccount;
