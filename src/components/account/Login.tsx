import React, { useState, ChangeEvent, useContext } from "react";

import { 
  Card, 
  CardContent, 
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import Landing from "../../assets/img/brand/landing.png";
import Logo from "../../assets/img/brand/logo_white.png";
import { useSpring, animated } from 'react-spring'
import { useHistory } from "react-router-dom";
import { UserContext } from "../../auth/UserContext";
import { accountPageStyles } from "./AccountStyles";

export const Login: React.FC<any> = (props) => {

  const springProps = useSpring({opacity: 1, from: {opacity: 0}});
  const styles = accountPageStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext<any>(UserContext);

  async function handleSignIn() {
    await handleLogin(email, password);
    history.push("/home");
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

  return(
    <animated.div className={styles.root} style={springProps}>
      <Grid
        container 
        direction="column"
        justify="space-around"
        className={styles.grid}>
        <Grid item xs={12} >
          <img src={Landing} className={styles.landingImage} alt="start engaging your audience"/>
        </Grid>
        <Grid item xs={12} >
          <Card className={styles.card}>
            <CardContent>
              <form>
                <Grid container spacing={2}  direction="column">
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
                      onClick={handleSignIn}
                      className={styles.button}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            <Typography className={styles.bottomCardLink} onClick={() => history.push("/create-account")}>Don't Have an Account? Click Here!</Typography>
            <Typography className={styles.bottomCardLink} onClick={() => history.push("/reset-account")}>Reset Password</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container justify="flex-end">
          <img src={Logo} className={styles.logo} alt="savour messaging logo"/>
        </Grid>
      </Grid>
    </animated.div>
  );
}
