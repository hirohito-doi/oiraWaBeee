import React from 'react';
import moment from 'moment'
import { makeStyles } from '@material-ui/styles';
import { Toolbar, Button, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  calendarHeader: {
    justifyContent: "center"
  },
  buttonThisMonth: {
    marginRight: 15
  },
  buttonMonthArrow: {
    margin: "0 10px"
  },
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

const CalendarHeader = (props) => {
  const { targetDate, changeMonth } = props;
  const classes = useStyles();
  const m = moment(targetDate);

  const now = moment();
  const thisYear = now.year();
  const thisMonth = now.month()

  return (
    <Toolbar
      className={classes.calendarHeader}
      position="relatice"
      color='default'
    >
      <MonthArrow
        {...props}
        isNext={false}
      />
      <Button
        className={classes.buttonThisMonth}
        variant="outlined"
        color="primary"
        onClick={()=>{changeMonth(thisYear, thisMonth)}}
      >
        <Typography>
          今月
        </Typography>
      </Button>
      <Typography
        className={classes.textDate}
        dispay="inline"
        variant="h6"
      >
        {m.format("YYYY年M月")}
      </Typography>
      <MonthArrow
        {...props}
        isNext={true}
      />
    </Toolbar>
  )
}

export default CalendarHeader;