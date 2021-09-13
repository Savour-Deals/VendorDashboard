import React from 'react';

import {business} from '../../../../.storybook/resources/business';

import BusinessEditModal from '../BusinessEditModal';

export default {
  title: 'Business/Edit Business',
  component: BusinessEditModal,
};

export const Default = () => 
	<BusinessEditModal
		business={business}
		modalOpen={true}
		toggleBusinessModal={() => {}}
		updateBusiness={() => {}}
	/>;
