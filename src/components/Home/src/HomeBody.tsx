import React from "react";
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

interface HomeBodyProps {

}

export const HomeBody: React.FC<HomeBodyProps> = props => {
  return (
    <>
      
    </>
  );
}