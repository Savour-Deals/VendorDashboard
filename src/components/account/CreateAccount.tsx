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

export const CreateAccount: React.FC = () => {

  const springProps = useSpring({opacity: 1, from: {opacity: 0}});

  const styles = accountPageStyles();
  
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { handleSignUp } = useContext<IUserContext>(UserContext);

  function redirectToLogin() {
    history.push("/login");
  }

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
    const creationSuccess = await handleSignUp({
      email,
      firstName,  
      lastName,
      phoneNumber,
      password
    });

    console.log(creationSuccess);
    const error = creationSuccess.error;

    if (!error) {
      alert("Please check your email to confirm your account.");
      redirectToLogin();
    } else {
      alert(`Error, could not create user. ${error.message}`);
    }
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
      <Grid
        container 
        direction="column"
        justify="space-between"
        className={styles.grid}>
        <Grid item xs={12} >
          <img src={Landing} className={styles.landingImage} alt="start engaging your audience"/>
        </Grid>
        <Grid item xs={12} >
          <Card className={styles.card}>
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
            <Typography className={styles.bottomCardLink} onClick={() => history.push("/login")}>Already Have an Account? Click Here!</Typography>
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

