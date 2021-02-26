import React from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Hidden, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { Sidebar } from "./Sidebar";

import LogoWhite from "../../assets/img/brand/Savour_White.png";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      maxWidth:"15%",
      height:"auto",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "#49ABAA",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);

export const HomeHeader: React.FC = () => {

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Grid container  spacing={1} direction="row"  alignItems="center" justify="center">
          <Hidden smUp >
            <Grid item xs={6}>
              <IconButton             
                onClick={handleDrawerToggle}>
                  <Menu/>
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs={6}>
            <img src={LogoWhite} className={classes.img} alt="savour logo"/>
          </Grid>
        </Grid>
      </AppBar>

        <Hidden smUp >
          <Sidebar
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
          </Sidebar>
        </Hidden>
        <Hidden xsDown >
          <Sidebar
            variant="permanent"
            open
          >
          </Sidebar>
        </Hidden>
    </>
  );
}