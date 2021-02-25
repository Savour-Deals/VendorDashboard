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
  const [presetDeal1, setPresetDeal1] = useState(vendor.presetDeals ? vendor.presetDeals[0] : "");
  const [presetDeal2, setPresetDeal2] = useState(vendor.presetDeals ? vendor.presetDeals[1] : "");
  const [presetDeal3, setPresetDeal3] = useState(vendor.presetDeals ? vendor.presetDeals[2] : "");
  const [selectedDeal, setSelectedDeal] = useState(DealType.ONBOARD);
  const [loading, setLoading] = useState(false);

  function onboardDealChange(event: ChangeEvent<HTMLInputElement>) {
    const onboardDeal = event.target.value;
    setOnboardDeal(onboardDeal);
  }

  function presetDeal2Change(event: ChangeEvent<HTMLInputElement>) {
    const presetDeal2 = event.target.value;
    setPresetDeal2(presetDeal2);
  }

  function presetDeal1Change(event: ChangeEvent<HTMLInputElement>) {
    const presetDeal1 = event.target.value;
    setPresetDeal1(presetDeal1);
  }

  function presetDeal3Change(event: ChangeEvent<HTMLInputElement>) {
    const presetDeal3 = event.target.value;
    setPresetDeal3(presetDeal3);
  }

  const selectedDealChange = (event: ChangeEvent<{value: unknown}>) => setSelectedDeal(event.target.value as DealType);
  
  async function createDeal(dealString: string, dealInfo: string, vendorName: string): Promise<void> {
    try {
      const response = await API.post("message_service_API","/message_service/send_number", {
        body:{
          dealType: dealString,
          dealInfo,
          vendorName,
          twilioNumber: vendor.twilioNumber,
          subscribers: vendor.subscribers ? vendor.subscribers : [],
        },
      });
      console.log(response);
    } catch (e) {
      console.log(`Whoops! Error with ${dealString} type. Here are some more details: \n ${e}`);
    }

  }

  async function runDeal(deal: DealType): Promise<void> {
    console.log(deal);
    setLoading(true);
    switch(deal) {
      case DealType.ONBOARD:
        await createDeal("ONBOARD", onboardDeal, vendor.vendorName);
        break;
      case DealType.SINGLE_CLICK:
        await createDeal("SINGLE_CLICK", presetDeal1, vendor.vendorName);
        break;
      case DealType.DOUBLE_CLICK:
        await createDeal("DOUBLE_CLICK", presetDeal2, vendor.vendorName);
        break;
      case DealType.LONG_CLICK:
        await createDeal("LONG_CLICK", presetDeal3, vendor.vendorName);
        break;
      default:
        throw new Error("No deal type found");
    }
    console.log(loading);
    setLoading(false);
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
            {vendor.presetDeals &&
              vendor.presetDeals.map((deal, i) => <Grid item xs={4}>
                Preset Deal {i}: {deal}
              </Grid>)
            }
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
              {vendor.presetDeals &&
                vendor.presetDeals.map((deal, i) => 
                  <MenuItem value={i}>Preset Deal {i}</MenuItem>)
              }
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
                          value={presetDeal1}
                          onChange={presetDeal1Change}
                        />                    
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                          label="Double-click Deal"
                          value={presetDeal2}
                          onChange={presetDeal2Change}
                        />                    
                    </Grid>
                    <Grid item xs={4}>
                      <TextField 
                          label="Long-click Deal"
                          value={presetDeal3}
                          onChange={presetDeal3Change}
                        />                    
                    </Grid>
                    <Button 
                      className={styles.button}
                      onClick={() => updateVendor({
                        ...vendor, 
                        presetDeals: [presetDeal1, presetDeal2, presetDeal3],
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