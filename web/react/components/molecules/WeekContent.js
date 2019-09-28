import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DayContent from '../atoms/DayContent';

const useStyles = makeStyles(theme => ({
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
const WeekContent = (props) => {
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

export default WeekContent;