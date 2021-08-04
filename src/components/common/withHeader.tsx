import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring';
import { Header } from './Header';
import { Colors } from "../../constants/Constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: Colors.background.dark,
      minHeight: '100vh'
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

export function withHeader<T> (Component: React.ComponentType<T>, props: T) {
  const WrappedComponent: React.FC<T> = () => {
    const styles = useStyles();
    const springProps = useSpring({opacity: 1, from: {opacity: 0}});
    return (
      <animated.div className={styles.root} style={springProps}>
          <Header />
          <Component {...props}/>
      </animated.div>
    );
  };

  return WrappedComponent;
}