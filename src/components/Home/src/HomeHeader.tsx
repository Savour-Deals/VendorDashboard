import React from "react";
import { AppBar, Container, Icon, Grid } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import LogoWhite from "../../../assets/img/brand/Savour_White.png";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#49ABAA",
      padding: theme.spacing(3)
    },

    img: {
      maxWidth:"25%",
      height:"auto",
      
  }
  }),
);

export const HomeHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Grid container  spacing={1} direction="row" alignItems="center">
        <Grid container item xs={6}>
          <Icon><Menu/></Icon>
        </Grid>
        <Grid item xs={4}>
          <img src={LogoWhite} className={classes.img}/>
        </Grid>

      </Grid>
    </AppBar>
  );
}