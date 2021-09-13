import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  light: {
    color: "#FFFFFF"
  },
  dark: {
    color: "#000000"
  }
});

export const LightTextTypography = (props: any) => {
  const styles = useStyles();
  return <Typography 
    component="span"
    variant={props.variant} 
    className={styles.light}>
      {props.children}
    </Typography>;
};

export const DarkTextTypography = (props: any) => {
  const styles = useStyles();
  return <Typography 
    component="span" 
    variant={props.variant} 
    className={styles.dark}>
      {props.children}
    </Typography>;
};