import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Typography, Avatar, Badge } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  calendarBody: {
    // border: "solid 1px #ddd"
    width: 750,
    padding: 25,
    margin: "auto"
  },
  weekNames: {
    display: "flex",
    justifyContent: "center"
  },
  dayOfWeek: {
    width:100,
    height: 40,
    borderRadius: 0,
  },
  week: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "solid 1px #ddd",
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  sunday: {
    color: "#c51162"
  },
  satruday: {
    color: "#303f9f"
  },
  day: {
    width: 100,
    height: 100,
    borderRight: "solid 1px #ddd",
    '&:last-child': {
      borderRight: 'none',
    }
  },
  dayBefore: {
    opacity: .4
  },
  activeMessage: {
    minHeight: 75,
    padding: 10
  },
  avatar: {
    width: 25,
    height: 25
  },
  badge: {
    top: 5,
  },
  message: {
    position: "relative",
    padding: 1,
    marginTop: 7,
    border: "solid 1px #ccc",
    borderRadius: 2,
    '&::before': {
      content: '""',
      position: "absolute",
      top: -18,
      left: 3,
      border: "9px solid transparent",
      borderBottom: "9px solid #ddd",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent"
    },
    '&:after': {
      content: '""',
      position: "absolute",
      top: -16,
      left: 5,
      border: "8px solid transparent",
      borderBottom: "8px solid #fff",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent"
    },
  }
}));

/**
 * 日表示
 * @param {*} props
 */
const DayContainer = (props) => {
  const { year, month, day, dateSelects, toggleDateSelect, index } = props;
  const classes = useStyles();

  const m = moment({y:year, M:month, d:day});
  const now = moment();

  // 日付が表示用クラス設定
  let classDayColor = "";
  if (index==0) { // 日曜日
    classDayColor += ` ${classes.sunday}`;
  } 
  if (index==6) { // 土曜日
    classDayColor += ` ${classes.satruday}`;
  }

  // 今日より前の日付か
  let classDay = `${classes.day}`;
  let handleClick = ()=>{toggleDateSelect(m.format('YYYY-MM-DD'))}
  if(m.isBefore(now, 'day')) {
    classDay += ` ${classes.dayBefore}`
    handleClick = ()=>{}
  }

  // 選択済みチェック
  let isSelected = false;
  if(!m.isBefore(now, 'day') && dateSelects.indexOf(m.format('YYYY-MM-DD')) >= 0) {
    isSelected = true;
  }

  return (
    <CardActionArea
      className={classDay}
      onClick={handleClick}
    >
      <Typography className={classDayColor}>
        <Badge
          className={classes.badge}
          color="secondary"
          variant="dot"
          invisible={!m.isSame(now, 'day')}
        >
          {day}
        </Badge>
      </Typography>
      <CardContent className={classes.activeMessage}>
        {day && isSelected &&
          <React.Fragment>
            <Avatar className={classes.avatar} alt="Beeee" src="/static/beeee.jpg" />
            <Typography className={classes.message} variant="caption" display="block">
              まかせろぁ！
            </Typography>
          </React.Fragment>
        }
      </CardContent>
    </CardActionArea>
  )
}

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
        <DayContainer
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
 * 曜日表示
 */
const WeekNames = () => {
  const names = ["日", "月", "火", "水", "木", "金", "土",];
  const classes = useStyles();
  return (
    <div className={classes.weekNames}>
      {names.map((name, index) => {
        let classWeek = `${classes.dayOfWeek}`;
        if (index==0) { // 日曜日
          classWeek += ` ${classes.sunday}`;
        } 
        if (index==6) { // 土曜日
          classWeek += ` ${classes.satruday}`;
        }

        return(
          <Typography
            key={name}
            className={classWeek}
          >
            {name}
          </Typography>
        )
      })}
    </div>
  )
}

/**
 * カレンダー
 * @param {*} props
 */
const CalendarBody = (props) => {
  const { monthCalendar, targetDate } = props;
  const classes = useStyles();
  return (
    <Card className={classes.calendarBody}>
      <WeekNames />
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

export default CalendarBody;