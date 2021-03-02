import React from "react";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Hidden, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { SideBar } from "./SideBar";
import { Pages } from "../../constants/Pages";

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

interface IHomeHeader {
  setCurrPage: (page: Pages) => void;
};

export const HomeHeader: React.FC<IHomeHeader> = props => {

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
          <SideBar
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
          </SideBar>
        </Hidden>
        <Hidden xsDown >
          <SideBar
            variant="permanent"
            open
          >
          </SideBar>
        </Hidden>
    </>
  );
}