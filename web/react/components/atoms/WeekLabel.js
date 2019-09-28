import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  sunday: {
    color: "#c51162"
  },
  satruday: {
    color: "#303f9f"
  }
}));

/**
 * 週の表示名
 */
const WeekLabel = props => {
  const { weekNum, label } = props;
  const classes = useStyles();
  
  let classWeek = `${classes.dayOfWeek}`;
  if (weekNum==0) { // 日曜日
    classWeek += ` ${classes.sunday}`;
  } 
  if (weekNum==6) { // 土曜日
    classWeek += ` ${classes.satruday}`;
  }

  return(
    <Typography
      className={classWeek}
    >
      {label}
    </Typography>
  )
}

export default WeekLabel;