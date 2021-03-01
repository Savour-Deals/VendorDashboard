import React, { ChangeEvent } from "react";
import { 
  makeStyles, 
  Theme, 
  createStyles, 
  TextField, 
  List, 
  ListItem, 
  ListItemSecondaryAction, 
  Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import Constants from "../../../constants/Constants";

interface IMessageInputForm {
  onUpdatePresetMessages: (messages: string[]) => void;
  onUpdateOnboardingMessage: (newMessage: string) => void;
  presetMessages: string[];
  onboardingMessage?: string;
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1
    },
    textInput: {
      width: '100%'
    },
    divider: {
      margin: '10px'
    }
  })
);

export const MessageInputForm: React.FC<IMessageInputForm> = props => {
  const styles = useStyles();

  function onAddMessage() {
    props.onUpdatePresetMessages([
      ...props.presetMessages,
      ""
    ]);
  }

  function onDeleteMessage(index: number) {
    let newMessages = [...props.presetMessages];
    newMessages.splice(index, 1);
    props.onUpdatePresetMessages(newMessages);
  }

  function onOnboardingChange(event: ChangeEvent<HTMLInputElement>) {
    let message = event.target.value;
    if (message.length <= Constants.MAX_MESSAGE_LENGTH) {
      props.onUpdateOnboardingMessage(message);
    }
  }

  function onPresetMessageChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    let message = event.target.value;
    if (message.length <= Constants.MAX_MESSAGE_LENGTH) {
      let newMessages = [...props.presetMessages];
      newMessages[index] = message;
      props.onUpdatePresetMessages(newMessages);
    }
  }

  return ( 
    <List
      className={styles.root}>
      <ListItem>Onboarding Message</ListItem>
      <ListItem>
        <TextField
          className={styles.textInput}
          label="Onboard Message"
          value={props.onboardingMessage || ""}
          onChange={onOnboardingChange}/>
      </ListItem>
      <ListItem>
        Preset Messages  
        <ListItemSecondaryAction>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddMessage}>
            Add
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      { props.presetMessages.map((message, index) => 
        <ListItem>
          <TextField
            className={styles.textInput}
            label= {`Preset message ${index}`}
            placeholder="Input preset message..."
            rowsMax={3}
            value={message}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onPresetMessageChange(event, index)}
          />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={() => onDeleteMessage(index)}>
              <DeleteIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>)
      } 
    </List>
  );
}
