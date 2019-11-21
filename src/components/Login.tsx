import React from "react";

import { 
  Card, 
  CardHeader, 
  CardContent, 
  AppBar,
  makeStyles, 
  createStyles, 
  Theme, 
  TextField,
  CardMedia
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LogoWhite from "../assets/img/brand/Savour_White.png";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: "400px",
      margin: theme.spacing(3),
      display: "inline-block"

    },
    root: {
      textAlign: "center",
      padding: theme.spacing(1),
    },
    header: {
      backgroundColor: "#49ABAA",

    },
    img: {
      height: 125,
      backgroundColor: "#49ABAA",

      
  }
  }),
);

export const Login: React.FC<any> = (props) => {

  const { isAuthenticated } = props;
  const styles = useStyles();

  if (isAuthenticated) return <Redirect to="/index" />;

  return(
    <div className={styles.root}>
      <Card className={styles.card}>
        {/* <CardHeader
        /> */}
        <CardMedia
          className={styles.img}
          image={LogoWhite}
          title="logo"
        />
        <CardContent>
          <h1>Sign In</h1>
          <form>
            
            <TextField
              id="email"
              label="Email"
              margin="normal"
              type="email"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
            />
          </form>

          <h4>Don't Have an Account? Click Here!</h4>
        </CardContent>
      </Card>
    </div>
  );
}

