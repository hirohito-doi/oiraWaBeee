import React from 'react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import {getTargetYearMonth, calcCalendarByMonth } from '../../services/CalendarService'
import Calendar from './Calendar'

export default {
  component: Calendar,
  title: 'Calendar',
};

export const regular = () => {
  const m = moment();
  const monthCalendar = calcCalendarByMonth(m.year(), m.month());
  return(
    <Calendar
      targetDate={m.format()}
      dateSelects={[]}
      monthCalendar={monthCalendar}
      year={m.year()}
      month={m.month()}
      toggleDateSelect={action('clicked')}
    />
  )
};