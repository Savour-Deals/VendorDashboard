import React, { useContext } from "react";
import { HomeHeader } from "./HomeHeader";
import { HomeBody } from "./HomeBody";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {useSpring, animated} from 'react-spring'
import { API } from "aws-amplify";
import { UserContext } from "../../../auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

async function getUserData(userName: string) {
  const updateBusinessUserResponse = await API.get(
    "business_users",
    "/business_users/" + userName,
    {});
}

export const Home: React.FC = () => {
  const styles = useStyles();
  const useAuth = useContext(UserContext);
  console.log(useAuth);
  const springProps = useSpring({opacity: 1, from: {opacity: 0}});

  return (
    <animated.div className={styles.root} style={springProps}>
        <HomeHeader/>
        <HomeBody/>
    </animated.div>
  );
}