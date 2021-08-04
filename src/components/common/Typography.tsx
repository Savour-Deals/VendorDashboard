import { Typography, withStyles } from "@material-ui/core";

export const LightTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

export const DarkTextTypography = withStyles({
  root: {
    color: "#000000"
  }
})(Typography);