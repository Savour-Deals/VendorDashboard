import React from 'react';

import {businessUser} from '../../../../../.storybook/resources/businessUser';
import AddBusinessModal from '../AddBusinessModal';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

import config from '../../../../config';
const stripePromise = loadStripe(config.stripe.API_KEY);

export default {
  title: 'Business/Add Business',
  component: AddBusinessModal,
};

export const Default = () => 
  <Elements stripe={stripePromise}>
    <AddBusinessModal
      businessUser={businessUser}
      onClose={() => {}}
      onError={() => {}}
    />
  </Elements>;
