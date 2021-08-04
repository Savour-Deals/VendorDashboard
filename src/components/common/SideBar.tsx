import React, { useContext } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { UserContext } from "../../auth/UserContext";
import { useHistory } from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Colors } from "../../constants/Constants";
import { LightTextTypography } from "./Typography";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => createStyles({
    fullList: {
      width: 'auto',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,

    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: `${Colors.appBar.dark}`,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    sidebar: {
      padding: theme.spacing(4),
    },
    icon: {
      color: Colors.text.light,
    }
  })
);

interface SideBarProps {
  open: boolean;
  variant?: 'permanent' | 'persistent' | 'temporary';
  onClose?: (event: React.MouseEvent) => void;
}

export const SideBar: React.FC<SideBarProps> = (props) => {
  const styles = useStyles();
  const { open, onClose } = props;
  const history = useHistory();

  const { handleLogout } = useContext<any>(UserContext);

  async function handleSignOut(_: React.MouseEvent) {
    await handleLogout();
    history.push("/login");
  }

  const sideList = () => (
    <div
      role="presentation"
      onClick={onClose}
      className={styles.sidebar}
    >
      <List>
        <ListItem button key={"campaigns"} onClick={() => history.push("/home")}>
          <ListItemIcon>
            <HomeIcon className={styles.icon}/>
          </ListItemIcon>
          <ListItemText>
            <LightTextTypography>Home</LightTextTypography>
          </ListItemText>
        </ListItem>
        <ListItem button key={"logout"} onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon className={styles.icon}/>
          </ListItemIcon>
          <ListItemText>
            <LightTextTypography>Log out</LightTextTypography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );


  return(
    <Drawer 
      open={open} 
      onClose={onClose}
      variant={props.variant}
      className={styles.drawer}
      classes={{
        paper: styles.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {/* Add space for header if on desktop */}
      {props.variant === "permanent" && <Toolbar/>} 
      <div className={styles.drawerContainer}>
        {sideList()}
      </div>
    </Drawer>
  );
}