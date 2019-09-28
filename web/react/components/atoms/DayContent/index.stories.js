import React from 'react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import DayContent from '.'

export default {
  component: DayContent,
  title: 'DayContent',
};

export const Today = () => {
  const m = moment();
  return (
    <DayContent
      year={m.year()}
      month={m.month()}
      day={m.date()}
      dateSelects={[]}
      toggleDateSelect ={action('clicked')}
      index={m.day()}
    />
  )
};

export const TodayOn = () => {
  const m = moment();
  return (
    <DayContent
      year={m.year()}
      month={m.month()}
      day={m.date()}
      dateSelects={[m.format("YYYY-MM-DD")]}
      toggleDateSelect ={action('clicked')}
      index={m.day()}
    />
  )
};

export const Yesterday = () => {
  const m = moment().subtract(1, 'days');
  return (
    <DayContent
      year={m.year()}
      month={m.month()}
      day={m.date()}
      dateSelects={[m.format("YYYY-MM-DD")]}
      toggleDateSelect ={action('clicked')}
      index={m.day()}
    />
  )
};