import React from 'react';
import moment from 'moment'

const MonthArrow = (props) => {
  const { targetDate, changeMonth, isNext } = props;

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

  console.log('???', year, month)

  return(
    <div
      style={{display: "inline-block"}}
      onClick={()=>{changeMonth(year, month)}}
    >
      <i className="material-icons">{icon}</i>
    </div>
  )
}

const CalendarHeader = (props) => {
  const { targetDate } = props;
  const m = moment(targetDate);

  return (
    <div className="calendar-header">
      <MonthArrow
        {...props}
        isNext={false}
      />
      <button style={{display: "inline-block"}}>今月</button>
      <div style={{display: "inline-block"}}>{m.format("YYYY年M月")}</div>
      <MonthArrow
        {...props}
        isNext={true}
      />
    </div>
  )
}

export default CalendarHeader;