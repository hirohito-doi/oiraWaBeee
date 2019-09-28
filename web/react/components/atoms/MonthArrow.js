import React from 'react';
import moment from 'moment'
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textDate: {
    width: 140
  }
}));

const MonthArrow = (props) => {
  const { targetDate, changeMonth, isNext } = props;
  const classes = useStyles();

  const m = moment(targetDate);
  let year, month, icon;

  if(isNext) {
    m.add(1, 'month')
    icon = "keyboard_arrow_right";
  } else {
    m.add(-1, 'month');
    icon = "keyboard_arrow_left";
  }

  year = m.year();
  month = m.month();

  return(
    <IconButton
      className={classes.buttonMonthArrow}
      onClick={()=>{changeMonth(year, month)}}
    >
      <i className="material-icons">{icon}</i>
    </IconButton>
  )
}

export default MonthArrow;