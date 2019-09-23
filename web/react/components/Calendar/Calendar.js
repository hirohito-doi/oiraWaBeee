import React from 'react';
import moment from 'moment'
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.getDateSelects = this.getDateSelects.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.toggleDateSelect = this.toggleDateSelect.bind(this);

    // カレンダー情報
    // 今月の分はあらかじめ計算する
    const { year, month } = this.getTargetYearMonth();
    const calendar = {[year]: {}};
    calendar[year][month] = this.calcCalendarByMonth(year, month);

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
   * 文字列から対応する年と月を返す
   */
  getTargetYearMonth(mFormat) {
    const m = moment(mFormat);
    return {
      year : m.year(),
      month: m.month()
    }
  }

  /**
   * カレンダー用の配列を生成する
   */
  calcCalendarByMonth(year, month) {
    let calendar = [];
    const m = moment({y: year, M: month});

    const emptyWeek = [null, null, null, null, null, null, null]; // 週のテンプレ
    const count = m.daysInMonth(); // 月の日数

    for(let i=1; i <= count; i++) {
      const dm = moment({y: year, M: month, d: i});
      const weekDay = dm.weekday();

      // 1日目か日曜日の場合に新しい週の配列を追加する
      if(i==1 || weekDay == 0) {
        calendar.push([...emptyWeek]);
      }

      const weekCount = calendar.length;

      // 配列に該当日を追加する
      calendar[weekCount-1][weekDay] = i;
    }

    return calendar;
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
      newCalendar[year][month] = this.calcCalendarByMonth(year, month);
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
    const {year, month} = this.getTargetYearMonth(targetDate)
    const monthCalendar = calendar[year][month];

    return (
      <div className="calendar-container" style={{minWidth: 600, textAlign: "center"}}>
        <CalendarHeader
          targetDate={targetDate}
          changeMonth={this.changeMonth}
        />
        <CalendarBody
          targetDate={targetDate}
          dateSelects={dateSelects}
          monthCalendar={monthCalendar}
          year={year}
          month={month}
          toggleDateSelect={this.toggleDateSelect}
        />
      </div>
    )
  }

}

export default Calendar;