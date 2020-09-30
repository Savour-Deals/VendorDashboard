import { Card, CardContent, CardHeader, createStyles, Fade, Grid, IconButton, makeStyles, Modal, Theme, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

import React, { ChangeEvent, useState } from 'react';

interface IVendorModal {
  vendor: Vendor;
  vendorState: {[key:string]: boolean};
  toggleVendorModal: (placeId: string, isOpen: boolean) => void;
  updateVendor: (updatedVendor: Vendor) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    margin: theme.spacing(3),
    display: "inline-block",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70%",
  },
  cardContent: {
    alignItems: "center",
    width: "80%"
  },
  button: {
    backgroundColor: "#49ABAA",
    color: "white",
    margin: theme.spacing(2),
  },
  modal: {
    margin: theme.spacing(3),
    display: "inline-block",
    alignContent: "center",
    alignItems: "center",
    width: "50%",
    height: "50%",
  }

}));

const VendorModal: React.FC<IVendorModal> = props => {
  
  const { vendor, vendorState, toggleVendorModal, updateVendor } = props;

  const styles = useStyles();

  const [onboardDeal, setOnboardDeal] = useState(vendor.onboardDeal);
  const [singleClickDeal, setSingleClickDeal] = useState(vendor.singleClickDeal);
  const [doubleClickDeal, setDoubleClickDeal] = useState(vendor.doubleClickDeal);
  const [longClickDeal, setLongClickDeal] = useState(vendor.longClickDeal);

  function onboardDealChange(event: ChangeEvent<HTMLInputElement>) {
    const onboardDeal = event.target.value;

    setOnboardDeal(onboardDeal);
  }

  function doubleClickDealChange(event: ChangeEvent<HTMLInputElement>) {
    const doubleClickDeal = event.target.value;
    
    setDoubleClickDeal(doubleClickDeal);
  }

  function singleClickDealChange(event: ChangeEvent<HTMLInputElement>) {
    const singleClickDeal = event.target.value;
    
    setSingleClickDeal(singleClickDeal);
  }

  function longClickDealChange(event: ChangeEvent<HTMLInputElement>) {
    const longClickDeal = event.target.value;

    setLongClickDeal(longClickDeal);
  }
  
  // TODO: pass in correct deal
  function runDeal(): void {
    console.log(runDeal);
  }

  return (
      <Grid key={vendor.placeId} item xs={12}>
      <Card className={styles.cardContent}>
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
              <Button 
                    variant="contained"   
                    className={styles.button} 
                    onClick={runDeal}>
                      Run Onboard Deal
                  </Button> 
            </Grid>
            <Grid item xs={4}>
              Single Click Deal: {vendor.singleClickDeal}
              <Button 
                    variant="contained"   
                    className={styles.button} 
                    onClick={runDeal}>
                      Run Single-click Deal
                  </Button> 
            </Grid>
            <Grid item xs={4}>
              Long Click Deal: {vendor.longClickDeal}
              <Button 
                    variant="contained"   
                    className={styles.button} 
                    onClick={runDeal}>
                      Run Long-click Deal
                  </Button> 
            </Grid>
            <Grid item xs={4}>
              Double-click Deal: {vendor.onboardDeal}
              <Button 
                    variant="contained"   
                    className={styles.button} 
                    onClick={runDeal}>
                      Run Double-click Deal
                  </Button> 
            </Grid>
            {/* <Grid item container xs={4}>
              Current Subscribers:
              { vendor.subscribers ? Object.keys(vendor.subscribers).map((key: string, index: number) =>{
                return (
                  <Grid item xs={4} key={index}>
                    {(vendor.subscribers) ? vendor.subscribers! : null}
                  </Grid>
                )
              }) : null}
            </Grid> */}
          </Grid>
          <Modal 
            open={vendorState[vendor.placeId]}
            onClose={() => toggleVendorModal(vendor.placeId, false)}
          >
            <Fade in={vendorState[vendor.placeId]}>
              <Card  className={styles.modal}>
                <CardHeader
                    title={vendor.vendorName}
                    subheader={vendor.primaryAddress}
                    action={
                      <CancelIcon onClick={() => toggleVendorModal(vendor.placeId, false)}>
                        <EditIcon/>
                      </CancelIcon>
                    }
                  />
                <CardContent className={styles.cardContent}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <TextField 
                        label="Onboard Deal"
                        value={onboardDeal}
                        onChange={onboardDealChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                          label="Single-click Deal"
                          value={singleClickDeal}
                          onChange={singleClickDealChange}
                        />                    
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                          label="Double-click Deal"
                          value={doubleClickDeal}
                          onChange={doubleClickDealChange}
                        />                    
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                          label="Long-click Deal"
                          value={longClickDeal}
                          onChange={longClickDealChange}
                        />                    
                    </Grid>
                    <Button 
                      className={styles.button}
                      onClick={() => updateVendor({
                        ...vendor, 
                        singleClickDeal, 
                        doubleClickDeal,
                        longClickDeal,
                        onboardDeal,
                      })}
                    >
                      Save
                    </Button>
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