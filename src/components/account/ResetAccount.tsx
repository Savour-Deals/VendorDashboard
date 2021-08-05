import React, { ChangeEvent, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import Logo from "../../assets/img/brand/logo_white.png";
import Landing from "../../assets/img/brand/landing.png";
import { 
  Card, 
  CardContent,
  Button,
  Grid,
} from "@material-ui/core";
import { TextField } from '@material-ui/core';
import { Auth } from "aws-amplify";
import { useHistory } from 'react-router-dom';
import { accountPageStyles } from "./AccountStyles";

  
const ResetAccount: React.FC = () => {

  const styles = accountPageStyles();
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
    <animated.div 
      className={styles.root} 
      style={springProps}>
      <Grid
        container 
        direction="column"
        justify="space-around"
        className={styles.grid}>
        <Grid item xs={12} >
          <img 
            src={Landing} 
            className={styles.landingImage} 
            alt="start engaging your audience"/>
        </Grid>
        <Grid item xs={12}>
          <Card 
            className={styles.card}>
            <CardContent>
              <Grid 
                container 
                spacing={2}  
                direction="column">
              <Grid item xs={12}>
                <TextField
                  label="Enter Email"
                  type="email"
                  onChange={handleEmailChange}/>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className={styles.button}
                  onClick={handleSubmit}>
                  Send Password
                </Button>
              </Grid>
            </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container justify="flex-end">
          <img 
            src={Logo} 
            className={styles.logo} 
            alt="savour messaging logo"/>
        </Grid>
      </Grid>
    </animated.div>
  );
}

export default ResetAccount;
