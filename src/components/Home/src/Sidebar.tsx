import React, { useState } from "react";
import Drawer from '@material-ui/core/Drawer';

export const Sidebar: React.FC = () => {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setOpen(open);
  }

  return(
    <Drawer open={open} onClose={toggleDrawer(false)}>

    </Drawer>
  );
}