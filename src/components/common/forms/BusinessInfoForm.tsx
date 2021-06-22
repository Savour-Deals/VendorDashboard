import React, { ChangeEvent, useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { List, ListItem } from "@material-ui/core";

import { BusinessSearchBox } from "../input/BusinessSearchBox";


interface IBusinessInfoForm {
  onChange: (name: string, address: string) => void;
}


const useStyles = makeStyles(theme => ({
	inputList: {
		flexGrow: 1
	},    
	textInput: {
		width: '100%'
	},
}));

export const BusinessInfoForm: React.FC<IBusinessInfoForm> = props => {
  const styles = useStyles();
	const { onChange } = props;
	
	const [name, setName] = useState("");
  const [address, setAddress] = useState("");

	function nameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function addressChange(event: ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

	useEffect(() => {
		onChange(name, address);
	}, [address, name, onChange]);
	
  return (
    <List className={styles.inputList}>
			<ListItem>                  
				<Typography variant="h2">
					Business Info
				</Typography>
			</ListItem>
			<ListItem>
				<Typography variant="body1">
					Search for a business below or manually enter your business name and address.
				</Typography>
			</ListItem>
			<ListItem>
				<BusinessSearchBox 
					setPrimaryAddress={setAddress}
					setVendorName={setName}/>
			</ListItem>
			<ListItem>
				<TextField
					className={styles.textInput}
					label="Business Name"
					value={name}
					variant="outlined"
					onChange={nameChange}
				/>  
			</ListItem>
			<ListItem>
				<TextField
					className={styles.textInput}
					label="Address"
					variant="outlined"
					value={address}
					onChange={addressChange}
				/>
			</ListItem>
		</List>
  );
}
