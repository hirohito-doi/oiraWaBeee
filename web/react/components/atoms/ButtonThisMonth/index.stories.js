import React from 'react';
import { action } from '@storybook/addon-actions';

import ButtonThisMonth from '.'

export default {
  component: ButtonThisMonth,
  title: 'ButtonThisMonth',
};

export const regular = () => (
  <ButtonThisMonth
    changeMonth={action('clicked')}
  />
);