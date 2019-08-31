import React from 'react';

/**
 *
 * @param {*} props
 */
const DayContainer = (props) => {
  const { day } = props;
  return (
    <div className="day" style={{width:100, height:100, border:"solid 1px #bbb"}}>
      {day}
    </div>
  )
}

/**
 *
 * @param {*} props
 */
const WeekContainer = (props) => {
  const { week, targetDate } = props;
  return (
    <div className="week" style={{display: "flex", justifyContent: "center"}}>
      {week.map((day, index) => (
        <DayContainer
          key={`${targetDate}-${index}`}
          {...props}
          day={day}
        />
      ))}
    </div>
  )
}

/**
 *
 */
const WeekNames = () => {
  const names = ["日", "月", "火", "水", "木", "金", "土",]
  return (
    <div className="week-names" style={{display: "flex", justifyContent: "center"}}>
      {names.map(name => (
        <div
          key={name}
          className="day-of-week"
          style={{width:100}}
        >
          {name}
        </div>
      ))}
    </div>
  )
}

/**
 * カレンダー
 * @param {*} props
 */
const CalendarBody = (props) => {
  const { monthCalendar, targetDate } = props;
  return (
    <div className="calendar-body">
      <WeekNames />
      {monthCalendar.map((week, index) => (
        <WeekContainer
          key={`${targetDate}-${index}`}
          {...props}
          week={week}
        />
      ))}
    </div>
  )
}

export default CalendarBody;