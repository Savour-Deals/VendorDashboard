import React from "react";
import { AppBar, Container, Icon, Grid, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import LogoWhite from "../../../assets/img/brand/Savour_White.png";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#49ABAA",
      padding: theme.spacing(1)
    },

    img: {
      maxWidth:"15%",
      height:"auto",
      
  }
  }),
);

export const HomeHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="sticky">
      <Grid container  spacing={1} direction="row" alignItems="center">
        <Grid item xs={6}>
          <IconButton><Menu/></IconButton>
        </Grid>
        <Grid item xs={6}>
          <img src={LogoWhite} className={classes.img}/>
        </Grid>
      </Grid>
    </AppBar>
  );
}