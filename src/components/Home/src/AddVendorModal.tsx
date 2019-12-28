import React from "react";
import { Modal, Card, CardContent } from "@material-ui/core";
import { useSpring, animated } from "react-spring";

interface IAddVendorModal {
  open: boolean;
  handleClose: () => void;
  addVendor: () => void;
}

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

// https://material-ui.com/components/modal/#modal
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export const AddVendorModal: React.FC<IAddVendorModal> = props => {

  const { open, handleClose } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade
        in={open}
      >
        <Card>
          <CardContent>
            <form>
              <h1>Create Vendor</h1>

            </form>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
}