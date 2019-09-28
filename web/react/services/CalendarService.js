import moment from 'moment'

/**
 * 文字列から対応する年と月を返す
 */
export const getTargetYearMonth = (mFormat) => {
  const m = moment(mFormat);
  return {
    year : m.year(),
    month: m.month()
  }
}

/**
 * カレンダー用の配列を生成する
 */
export const calcCalendarByMonth = (year, month) => {
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