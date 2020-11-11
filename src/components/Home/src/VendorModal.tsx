import { Card, CardContent, CardHeader, createStyles, Fade, Grid, IconButton, makeStyles, Modal, Theme, TextField, Button, InputLabel } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import { API } from "aws-amplify";
import React, { ChangeEvent, useState } from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { DealType } from "../../../domain/DealType";

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
    width: "inherit",
    height: "inherit",
  },
  cardContent: {
    alignItems: "center",
    width: "inherit",
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
    width: "inherit",
    height: "inherit",
  }
}));

const VendorModal: React.FC<IVendorModal> = props => {
  
  const { vendor, vendorState, toggleVendorModal, updateVendor } = props;

  const styles = useStyles();

  const [onboardDeal, setOnboardDeal] = useState(vendor.onboardDeal || "");
  const [singleClickDeal, setSingleClickDeal] = useState(vendor.singleClickDeal || "");
  const [doubleClickDeal, setDoubleClickDeal] = useState(vendor.doubleClickDeal || "");
  const [longClickDeal, setLongClickDeal] = useState(vendor.longClickDeal || "");
  const [selectedDeal, setSelectedDeal] = useState(DealType.ONBOARD);

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

  const selectedDealChange = (event: ChangeEvent<{value: unknown}>) => setSelectedDeal(event.target.value as DealType);
  
  async function createDeal(dealString: string, dealInfo: string): Promise<void> {
    try {
      await API.post("message_service","/message_service/send_number", {
        body:{
          dealType: dealString,
          dealInfo,
        },
      });
    } catch (e) {
      console.log(`Whoops! Error with ${dealString} type. Here are some more details: \n ${e}`);
    }

  }

  async function runDeal(deal: DealType): Promise<void> {
    console.log(deal);
    switch(deal) {
      case DealType.ONBOARD:
        createDeal("ONBOARD", onboardDeal);
        break;
      case DealType.SINGLE_CLICK:
        createDeal("SINGLE_CLICK", singleClickDeal);
        break;
      case DealType.DOUBLE_CLICK:
        createDeal("DOUBLE_CLICK", doubleClickDeal);
        break;
      case DealType.LONG_CLICK:
        createDeal("LONG_CLICK", longClickDeal);
        break;
      default:
        throw new Error("No deal type found");
    }
  }

  return (
      <Card >
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
          <Grid container spacing={1}> 
            <Grid item xs={4}>
              Onboard Deal: {vendor.onboardDeal}
            </Grid>
            <Grid item xs={4}>
              Single Click Deal: {vendor.singleClickDeal}
            </Grid>
            <Grid item xs={4}>
              Long Click Deal: {vendor.longClickDeal}
            </Grid>
            <Grid item xs={4}>
              Double-click Deal: {vendor.onboardDeal}
            </Grid>
          </Grid>
          <FormControl>
            <InputLabel id="deal-select-label">
              Select Deal
            </InputLabel>
            <Select
              value={selectedDeal}
              onChange={selectedDealChange}
            >
              <MenuItem value={DealType.ONBOARD}>Onboard Deal</MenuItem>
              <MenuItem value={DealType.SINGLE_CLICK}>Single Click Deal</MenuItem>
              <MenuItem value={DealType.DOUBLE_CLICK}>Double Click Deal</MenuItem>
              <MenuItem value={DealType.LONG_CLICK}>Long Click Deal</MenuItem>
            </Select>
            <Button 
                    variant="contained"   
                    className={styles.button} 
                    onClick={() => runDeal(selectedDeal)}>
                      Run Deal
              </Button> 
          </FormControl>
          <Modal 
            open={vendorState[vendor.placeId]}
            onClose={() => toggleVendorModal(vendor.placeId, false)}
          >
            <Fade in={vendorState[vendor.placeId]}>
              <Card className={styles.modal}>
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
  );
}

export default VendorModal;