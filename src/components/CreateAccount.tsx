import React, { useState, ChangeEvent, useContext } from "react";

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
  Button
} from "@material-ui/core";
import LogoWhite from "../assets/img/brand/Savour_White.png";
import Background from "../assets/img/brand/vendorbackground.jpg";
import {useSpring, animated} from 'react-spring'
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth";

export const CreateAccount: React.FC = () => {

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

  const springProps = useSpring({opacity: 1, from: {opacity: 0}});
  const styles = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { handleSignUp, handleLogin } = useContext<IAuthContext>(AuthContext);

  function validateForm(): boolean {
    if (confirmPassword !== password) {
      alert("Sorry, but the passwords do not match.")
      return false;
    }

    if (firstName === "") {
      alert("Please enter a first name.");
      return false;
    }

    return true;
  }

  async function handleCreateAccount() {


    const isValidated = validateForm();

    if (!isValidated) return;

    const creationSucess = await handleSignUp({
      email,
      firstName,  
      lastName,
      phoneNumber,
      password
    });

    history.push("/login");
    alert("Please check your email to confirm your account.")
  }

  function handlePhoneNumberChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const phoneNumber: string = event.target.value;
    setPhoneNumber(phoneNumber);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const email: string = event.target.value;
    setEmail(email);
  }

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const firstName: string = event.target.value;
    setFirstName(firstName);
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const lastName: string = event.target.value;
    setLastName(lastName);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const password: string = event.target.value;
    setPassword(password);
  }

  function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const confirmPassword: string = event.target.value;
    setConfirmPassword(confirmPassword);
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
                  id="first-name"
                  label="First Name"
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="last-name"
                  label="Last Name"
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone-number"
                  label="Phone Number"
                  onChange={handlePhoneNumberChange}
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
                <TextField
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleCreateAccount}
                  className={styles.button}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        <Typography className={styles.createAccount} onClick={() => history.push("/login")}>Already Have an Account? Click Here!</Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
}

