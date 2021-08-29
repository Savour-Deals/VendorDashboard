import React, { ChangeEvent } from "react";
import { 
  makeStyles, 
  Theme, 
  createStyles, 
  TextField, 
  List, 
  ListItem, 
  Typography,
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
      <ListItem key={0}>
        <Typography variant="body1">
          Onboarding Message
        </Typography>
      </ListItem>
      <ListItem key={1}>
        <Typography variant="body2">
          This is the message customers will receive when they first subscribe to your messaging number. You can set a welcome message, give them information about you, or share a deal for subscribing.
        </Typography>
      </ListItem>
      <ListItem key={2}>
        <TextField
          className={styles.textInput}
          label="Onboard Message"
          variant="outlined"
          value={props.onboardingMessage || ""}
          onChange={onOnboardingChange}/>
      </ListItem>
      <ListItem key={3}>
        <Typography variant="body1">
          Preset Messages
        </Typography>
        { props.presetMessages.length === 0 && 
          <IconButton 
            edge="end" 
            aria-label="add"
            onClick={onAddMessage}>
            <AddIcon/>
          </IconButton>}
      </ListItem>
      <ListItem key={4}>
        <Typography variant="body2">
          These are messages you can set for quick and convenient campaigns. You can change these at anytime and let you create common campaigns you may want to send out frequently.
        </Typography>
      </ListItem>
      { props.presetMessages.map((message, index) => 
        <ListItem key={5}>
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
