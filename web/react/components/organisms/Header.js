import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Toolbar, Typography } from '@material-ui/core';
import moment from 'moment';

import MonthArrow from '../atoms/MonthArrow';
import ButtonThisMonth from '../atoms/ButtonThisMonth';

const useStyles = makeStyles(theme => ({
  calendarHeader: {
    justifyContent: "center"
  },
  buttonThisMonth: {
    marginRight: 15
  },
  textDate: {
    width: 140
  }
}));

const Header = (props) => {
  const { targetDate } = props;
  const classes = useStyles();
  const m = moment(targetDate);

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
      <ButtonThisMonth {...props} />
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

export default Header;