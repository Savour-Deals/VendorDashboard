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
import Background from "../assets/img/brand/vendorbackground.jpg";
import Paper from "@material-ui/core/Paper";
import {useSpring, animated} from 'react-spring'
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { signIn } from "../auth";


export const Login: React.FC<any> = (props) => {

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
        backgroundSize: "cover",
        overflow: "hidden",
        height: "100%"
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

  const { isAuthenticated } = props;

  const springProps = useSpring({opacity: 1, from: {opacity: 0}});
  const [loadProps, setLoad] = useSpring(() => ({opacity: 1}));
  const styles = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {

    setLoading(true);
    try {
      const currentSession = await Auth.currentSession();
      console.log(currentSession);

    } catch(error) {
      console.log(error);
    }

    try {
      const payload = await signIn(email,password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

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
                  onClick={handleLogin}
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

