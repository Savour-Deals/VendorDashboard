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
  CardMedia,
  Typography
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LogoWhite from "../assets/img/brand/Savour_White.png";
import {useSpring, animated} from 'react-spring'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: "400px",
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
      height: 125,
      backgroundColor: "#49ABAA",

      
    },
    createAccount: {
      margin: theme.spacing(2),
      cursor: "pointer"
    },

  }),
);

export const Login: React.FC<any> = (props) => {

  const springProps = useSpring({opacity: 1, from: {opacity: 0}})

  const { isAuthenticated } = props;
  const styles = useStyles();

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

        <Typography className={styles.createAccount} onClick={() => console.log("TEST")}>Don't Have an Account? Click Here!</Typography>
        </CardContent>
      </Card>
    </animated.div>
  );
}

