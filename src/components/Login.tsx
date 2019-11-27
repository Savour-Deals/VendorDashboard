import React, { useState, ChangeEvent } from "react";

import { 
  Card, 
  CardHeader, 
  CardContent, 
  AppBar,
  Grid,
  makeStyles, 
  createStyles, 
  Theme, 
  TextField,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LogoWhite from "../assets/img/brand/Savour_White.png";
import {useSpring, animated} from 'react-spring'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(3),
      display: "inline-block",


    },
    root: {
      textAlign: "center",
      padding: theme.spacing(1),
    },
    header: {
      backgroundColor: "#49ABAA",

    },
    img: {
      width: "100%",
      height: 125,
      backgroundColor: "#49ABAA",

      
    },
    createAccount: {
      margin: theme.spacing(2),
      cursor: "pointer"
    },

    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: "white",
      margin: theme.spacing(2),
    },

  }),
);

export const Login: React.FC<any> = (props) => {

  const { isAuthenticated } = props;

  const springProps = useSpring({opacity: 1, from: {opacity: 0}});

  const styles = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => email.length > 0 && password.length > 0;

  function handleLogin() {
    
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    

    const email: string = event.target.value;
    setEmail(email);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password: string = event.target.value;
    setPassword(password);
  }


  if (isAuthenticated) return <Redirect to="/index" />;

  return(
    <animated.div className={styles.root} style={springProps}>
      <Card className={styles.card}>
        {/* <CardHeader
        /> */}
        <CardMedia
          className={styles.img}
          image={LogoWhite}
          title="logo"
        />
        <CardContent>
          <form>
            <Grid container spacing={1}  direction="column">
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  margin="normal"
                  type="email"
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={styles.button}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        <Typography className={styles.createAccount} onClick={() => history.push("/create-account")}>Don't Have an Account? Click Here!</Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
}

