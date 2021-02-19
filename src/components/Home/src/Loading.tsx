import React from "react";
import { Box, CircularProgress, createStyles, makeStyles, Theme } from "@material-ui/core";

interface LoadingProps {
}

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

export const Loading = (props: LoadingProps) => {
  const styles = useStyles();

  return (
    <Box component="div" className={styles.loader} >
      <CircularProgress/>
    </Box>
  );
}