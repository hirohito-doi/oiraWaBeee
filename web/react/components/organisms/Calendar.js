import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import WeekHeader from '../molecules/WeekHeader';
import WeekContent from '../molecules/WeekContent';

const useStyles = makeStyles(theme => ({
  calendar: {
    // border: "solid 1px #ddd"
    width: 750,
    padding: 25,
    margin: "auto"
  }
}));

/**
 * カレンダー
 * @param {*} props
 */
const Calendar = (props) => {
  const { monthCalendar, targetDate } = props;
  const classes = useStyles();

  return (
    <Card className={classes.calendar}>
      <WeekHeader />
      {monthCalendar.map((week, index) => (
        <WeekContent
          key={`${targetDate}-${index}`}
          {...props}
          week={week}
        />
      ))}
    </Card>
  )
}

export default Calendar;