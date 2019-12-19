import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1)
    },

    img: {
      maxWidth:"15%",
      height:"auto",
      
  }
  }),
);



export const HomeBody: React.FC = () => {
  const [vendors, setVendors] = useState([]);

  function renderVendors(vendors: Vendor[]): JSX.Element[] {
    const renderedVendors: JSX.Element[] = [];

    for (let i = 0; i < vendors.length; i++) {
      renderedVendors.push(
        <h1>Vendor {i}</h1>
      );
    }

    return renderedVendors;
  }

  const styles = useStyles();

  return ( 
    <div className={styles.root}>
      {renderVendors(vendors)}
    </div>
  );
}