import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  buttonThisMonth: {
    marginRight: 15
  }
}));

const ButtonThisMonth = props => {
  const { changeMonth } = props;
  const classes = useStyles();

  const now = moment();
  const thisYear = now.year();
  const thisMonth = now.month()

  return (
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
  )
}

export default ButtonThisMonth;