import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment'

import {getTargetYearMonth, calcCalendarByMonth } from '../services/CalendarService'
import Header from './organisms/Header';
import Calendar from './organisms/Calendar';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.getDateSelects = this.getDateSelects.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.toggleDateSelect = this.toggleDateSelect.bind(this);

    // カレンダー情報
    // 今月の分はあらかじめ計算する
    const { year, month } = getTargetYearMonth();
    const calendar = {[year]: {}};
    calendar[year][month] = calcCalendarByMonth(year, month);

    // 初期化
    this.state = {
      now: moment().format(),
      targetDate: moment().format(),
      calendar: calendar,
      dateSelects: []
    };
  }

  componentDidMount() {
    // APIを叩いてデータを取得する
    this.getDateSelects();
  }

  /**
   * 日付選択データを取得して反映する
   */
  getDateSelects() {
    fetch('/api/date-select/all')
      .then(res => res.json())
      .then(json => this.setState({ dateSelects: json.dateSelects }));
  }

  /**
   * 月を切り替える
   */
  changeMonth(year, month) {
    const { calendar } = this.state;
    const m = moment({y: year, M: month});
    let newState = {
      targetDate: m.format()
    }

    // カレンダーデータが存在しなければ新しく生成する
    let newCalendar = {...calendar}
    if(!(year in newCalendar)) {
      newCalendar[year] = {};
    }

    if(!(month in newCalendar[year])) {
      newCalendar[year][month] = calcCalendarByMonth(year, month);
      newState = {
        ...newState,
        calendar: newCalendar
      }
    }

    this.setState(newState);
  }

  /**
   * 日付の選択状態を変更する
   */
  toggleDateSelect(dateStr) {
    const { dateSelects } = this.state;
    const newDateSelects = [...dateSelects];

    const targetIndex = dateSelects.indexOf(dateStr)

    let method;
    if(targetIndex >= 0) {
      newDateSelects.splice(targetIndex, 1);
      method = "DELETE";
    } else {
      newDateSelects.push(dateStr);
      method = "POST";
    }

    // state更新
    this.setState({
      dateSelects: newDateSelects
    })

    // データ更新
    fetch(`/api/date-select/${dateStr}`, {
      method: method
    })
      .then(res => res.json())
      .then(() => this.getDateSelects()); // データを再取得する
  }

  render() {
    const { calendar, targetDate, dateSelects } = this.state;
    const {year, month} = getTargetYearMonth(targetDate)
    const monthCalendar = calendar[year][month];

    return (
      <div className="landing-page">
        <CssBaseline />
        <main className="page-content">
          <div className="main-content">
            <div className="calendar-container" style={{minWidth: 600, textAlign: "center"}}>
              <Header
                targetDate={targetDate}
                changeMonth={this.changeMonth}
              />
              <Calendar
                targetDate={targetDate}
                dateSelects={dateSelects}
                monthCalendar={monthCalendar}
                year={year}
                month={month}
                toggleDateSelect={this.toggleDateSelect}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }

}

export default MainPage;