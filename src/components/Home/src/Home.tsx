import React from "react";
import { HomeHeader } from "./HomeHeader";
import { HomeBody } from "./HomeBody";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring'

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

  return (
    <animated.div className={styles.root} style={springProps}>
        <HomeHeader/>
        <HomeBody/>
    </animated.div>
  );
}