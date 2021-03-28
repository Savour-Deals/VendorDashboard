import React from "react";
import { Box, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }
  })
);

export const Loading = () => {
  const styles = useStyles();

  return (
    <Box component="div" className={styles.loader} >
      <CircularProgress/>
    </Box>
  );
}