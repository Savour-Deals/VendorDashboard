import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

import {business} from '../../../../.storybook/resources/business';
import { Colors } from '../../../constants/Constants';
import { BusinessDetails } from '../BusinessDetails';


export default {
  title: 'Business/Business Details',
  component: BusinessDetails,
	parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: Colors.background.dark },
      ],
    },
  },
};

export const Default = () => 

	<BusinessDetails
		business={business}
		updateBusiness={() => {}}
	/>;
