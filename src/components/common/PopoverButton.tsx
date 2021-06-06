import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

interface IPopoverButton {
	buttonText: string,
	popoverText: string,
}
export const PopoverButton: React.FC<IPopoverButton> = (props: IPopoverButton) => {

	const {buttonText, popoverText} = props;
	
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div>
          <Button variant="contained"  {...bindTrigger(popupState)}>
            {buttonText}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>{popoverText}</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}