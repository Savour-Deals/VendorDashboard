import React, { ChangeEvent } from "react";
import { 
  makeStyles, 
  Theme, 
  createStyles, 
  TextField, 
  List, 
  ListItem, 
  ListItemSecondaryAction } from "@material-ui/core";
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
      <ListItem key={0}>Onboarding Message</ListItem>
      <ListItem key={1}>
        <TextField
          className={styles.textInput}
          label="Onboard Message"
          variant="outlined"
          value={props.onboardingMessage || ""}
          onChange={onOnboardingChange}/>
      </ListItem>
      <ListItem key={2}>
        Preset Messages
        { props.presetMessages.length === 0 && 
          <IconButton 
            edge="end" 
            aria-label="add"
            onClick={onAddMessage}>
            <AddIcon/>
          </IconButton>}
      </ListItem>
      { props.presetMessages.map((message, index) => 
        <ListItem key={3}>
          <TextField
            className={styles.textInput}
            label= {`Preset message ${index}`}
            placeholder="Input preset message..."
            rowsMax={3}
            value={message}
            variant="outlined"
            onChange={(event: ChangeEvent<HTMLInputElement>) => onPresetMessageChange(event, index)}
          />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={() => onDeleteMessage(index)}>
              <DeleteIcon/>
            </IconButton>
            { index === props.presetMessages.length - 1 && 
              <IconButton 
                edge="end" 
                aria-label="add"
                onClick={onAddMessage}>
                <AddIcon/>
              </IconButton>}
          </ListItemSecondaryAction>
        </ListItem>)
      } 
    </List>
  );
}
