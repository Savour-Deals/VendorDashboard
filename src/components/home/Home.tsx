import React, { useState } from "react";
import { HomeHeader } from "./HomeHeader";
import { HomeBody } from "./HomeBody";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import { Pages } from "../../constants/Pages";

import { Campaigns } from "../Campaign";

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


export const Home: React.FC = () => {
  const styles = useStyles();
  const springProps = useSpring({opacity: 1, from: {opacity: 0}});
  const [currPage, setCurrPage] = useState<Pages>(Pages.HOME);
  return (
    <animated.div className={styles.root} style={springProps}>
        <HomeHeader setCurrPage={setCurrPage} />
        <HomeBody/>
    </animated.div>
  );
}