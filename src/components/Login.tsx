import React from "react";

import { 
  Card, 
  CardHeader, 
  CardContent, 
  Grid, 
  makeStyles, 
  createStyles, 
  Theme, 
  TextField
} from "@material-ui/core";
import { withAuthenticator } from "aws-amplify-react";
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
  }),
);

const Login: React.FC<any> = (props) => {
  const { isAuthenticated } = props;

  if (isAuthenticated) return <Redirect to="/index" />;

  return(
    <>
    <Grid container item spacing={1} xs={12}>

      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <h2> Log In</h2>
          <form>
            
            <TextField
              id="username"
              label="Username"
              margin="normal"
            />

          </form>
        </CardContent>
      </Card>
      </Grid>

    </>
  );
}

export default withAuthenticator(Login);