import { Card, CardContent, CardHeader, createStyles, Fade, Grid, IconButton, makeStyles, Modal, Theme, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React from 'react';

interface IVendorModal {
  vendor: Vendor;
  vendorState: {[key:string]: boolean};
  toggleVendorModal: (placeId: string, isOpen: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    margin: theme.spacing(3),
    display: "inline-block",
    alignContent: "center",
    alignItems: "center",
    width: "70%",
    height: "70%",
  },
  cardContent: {
    alignItems: "center",
  },
}));

const VendorModal: React.FC<IVendorModal> = props => {
  
  const { vendor, vendorState, toggleVendorModal } = props;

  const styles = useStyles();

  return (
      <Grid key={vendor.placeId} item xs={4} >
      <Card>
        <CardHeader
          title={vendor.vendorName}
          subheader={vendor.primaryAddress}
          action={
            <IconButton onClick={() => toggleVendorModal(vendor.placeId, true)}>
              <EditIcon/>
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={3}> 
            <Grid item xs={4}>
              Onboard Deal: {vendor.onboardDeal}
            </Grid>
            <Grid item xs={4}>
              Single Click Deal: {vendor.singleClickDeal}
            </Grid>
            <Grid item xs={4}>
              Double Click Deal: {vendor.doubleClickDeal}
            </Grid>
            <Grid item container xs={4}>
              Current Subscribers:
              { vendor.subscribers ? Object.keys(vendor.subscribers).map((key: string, index: number) =>{
                return (
                  <Grid item xs={4} key={index}>
                    {vendor.subscribers!}
                  </Grid>
                )
              }) : null}
            </Grid>
          </Grid>
          <Modal 
            open={vendorState[vendor.placeId]}
            onClose={() => toggleVendorModal(vendor.placeId, false)}
          >
            <Fade in={vendorState[vendor.placeId]}>
              <Card  className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      Onboard Deal: {vendor.onboardDeal}

                      <TextField></TextField>
                    </Grid>
                    <Grid item xs={4}>
                      Single Click Deal: {vendor.singleClickDeal}
                    </Grid>
                    <Grid item xs={4}>
                      Double Click Deal: {vendor.doubleClickDeal}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Fade>
        </Modal>

          
        </CardContent>
      </Card>
    </Grid>
  );
}

export default VendorModal;