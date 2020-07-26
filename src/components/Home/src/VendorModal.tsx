import React from 'react';
import { Button, Card, CardContent, CardHeader, Grid, IconButton, TextField, Modal, Fade } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

interface IVendorModal {
  vendor: Vendor;
  vendorState: {[key:string]: boolean};
  toggleVendorModal: (placeId: string, isOpen: boolean) => void;
}
const VendorModal: React.FC<IVendorModal> = props => {
  
  const { vendor, vendorState, toggleVendorModal } = props;

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
              <div>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
              </div>
            </Fade>
        </Modal>

          
        </CardContent>
      </Card>
    </Grid>
  );
}

export default VendorModal;