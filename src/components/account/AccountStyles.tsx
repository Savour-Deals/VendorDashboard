import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Colors } from "../../constants/Constants";

export const accountPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      paddingTop: '5vh',
      maxWidth: '100vw',
      minHeight: '100vh', 
    },
    card: {
      margin: theme.spacing(1),
      display: "inline-block",
    },
    root: {
      textAlign: "center",
      backgroundColor: `${Colors.background.dark}`,
      minWidth: '100vw',
      minHeight: '100vh',
    },
    landingImage: {
      maxWidth: '80vw',
      maxHeight: '30vh',
    },
    logo: {
      width: '20vh',
      padding: theme.spacing(2),
    },
    bottomCardLink: {
      margin: theme.spacing(2),
      cursor: "pointer"
    },
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      color: "white",
      margin: theme.spacing(2),
    },
    confirmAccountDialog: {
      padding: theme.spacing(6),
    },
  }),
);