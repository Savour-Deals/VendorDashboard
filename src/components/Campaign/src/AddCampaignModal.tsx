import { Card, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import Fade from '../../common/Fade';


interface IAddCampaignModal {
  modalOpen: boolean;
  handleModalClose: () => void;
}
const AddCampaignModal: React.FC<IAddCampaignModal> = props => {
  const { modalOpen, handleModalClose } = props;
  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Fade in={modalOpen}>
        <Card>
          
        </Card>
      </Fade>
    </Modal>
  );
};

export default AddCampaignModal;