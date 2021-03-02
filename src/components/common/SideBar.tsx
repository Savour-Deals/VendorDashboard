import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { UserContext } from "../../auth/UserContext";
import { useHistory } from "react-router-dom";
import { Toolbar } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
});

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
    >
      <List>
        <ListItem button key={"campaigns"} onClick={() => history.push("/campaigns")}>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText primary={"Campaigns"} />
        </ListItem>
        <ListItem button key={"logout"} onClick={handleSignOut}>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
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