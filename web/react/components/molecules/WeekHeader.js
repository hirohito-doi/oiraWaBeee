import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WeekLabel from '../atoms/WeekLabel';

const useStyles = makeStyles(theme => ({
  weekNames: {
    display: "flex",
    justifyContent: "center"
  },
}));

/**
 * 曜日表示
 */
const WeekHeader = props => {
  const labels = ["日", "月", "火", "水", "木", "金", "土",];
  const classes = useStyles();

  return (
    <div className={classes.weekNames}>
      {labels.map((label, index) => {
        <WeekLabel
          {...props}
          label={label}
          index={index}
        />
      })}
    </div>
  )
}

export default WeekHeader;