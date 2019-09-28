import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import WeekHeader from '../molecules/WeekHeader';
import DayContent from '../atoms/DayContent';

const useStyles = makeStyles(theme => ({
  calendar: {
    // border: "solid 1px #ddd"
    width: 750,
    padding: 25,
    margin: "auto"
  },
  week: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "solid 1px #ddd",
    '&:last-child': {
      borderBottom: 'none'
    }
  }
}));

/**
 * 週表示
 * @param {*} props
 */
const WeekContainer = (props) => {
  const { week, targetDate } = props;
  const classes = useStyles();
  return (
    <div className={classes.week}>
      {week.map((day, index) => (
        <DayContent
          key={`${targetDate}-${index}`}
          {...props}
          index={index}
          day={day}
        />
      ))}
    </div>
  )
}

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
        <WeekContainer
          key={`${targetDate}-${index}`}
          {...props}
          week={week}
        />
      ))}
    </Card>
  )
}

export default Calendar;