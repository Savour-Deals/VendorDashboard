import React from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Hidden, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { SideBar } from "./SideBar";

import LogoWhite from "../../assets/img/brand/logo_white.png";
import { Colors } from "../../constants/Constants";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      justifyContent: 'left',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1)
      },
    },
    img: {
      maxHeight:"5vh",
      maxWidth:"80vw",
    },
    appBar: {
      width: '100vw',
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: `${Colors.appBar.dark}`,
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
    icon: {
      color: Colors.text.light,
    }
  }),
);



export const Header: React.FC = () => {

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Grid container direction="row" className={classes.grid} alignItems="center">
          <Hidden mdUp >
            <Grid item >
              <IconButton         
                onClick={handleDrawerToggle}>
                <Menu className={classes.icon}/>
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item >
            <img src={LogoWhite} className={classes.img} alt="savour logo"/>
          </Grid>
        </Grid>
      </AppBar>
      <Hidden mdUp >
        <SideBar
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
        </SideBar>
      </Hidden>
      <Hidden smDown >
        <SideBar
          variant="permanent"
          open
        >
        </SideBar>
      </Hidden>
    </>
  );
}