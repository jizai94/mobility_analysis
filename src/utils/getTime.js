/**
 * @ 一个时间处理函数
 * @ 参数作用：dateType 根据接收到的日期类型，确定返回当天、本周、本月的起始结束时间
 *           date  发送请求的具体日期，若为空则表示发送的是当天的请求
 */
const getTime = (dateType, isToday, date) => {
  const millisecond = 1000 * 60 * 60 * 24
  let endTime, dayStartTime, currentDate, weekStartTime, monthStartTime
  if (isToday) {
    currentDate = new Date()
    endTime = currentDate.getTime()
    currentDate.setHours(0)
    currentDate.setMinutes(0)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    dayStartTime = currentDate.getTime()
    let week = currentDate.getDay()
    let minusDay = week !== 0 ? week - 1 : 6
    let monday = new Date(currentDate.getTime() - (minusDay * millisecond))
    weekStartTime = monday.getTime()
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()
    let monthFir = new Date(currentYear, currentMonth, 1, 0, 0, 0)
    monthStartTime = monthFir.getTime()
  } else {    
    date = new Date(date)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    dayStartTime = date.getTime()
    endTime = dayStartTime + millisecond
    let week = date.getDay()
    let minusDay = week !== 0 ? week - 1 : 6
    let monday = new Date(dayStartTime - (minusDay * millisecond))
    weekStartTime = monday.getTime()
    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    let monthFir = new Date(currentYear, currentMonth, 1, 0, 0, 0)
    monthStartTime = monthFir.getTime()
  }

  switch (dateType) {
    case 'day':
      return {
        ec_ranges_start: dayStartTime,
        ec_ranges_end: endTime
      }
    case 'week':
      return {
        ec_ranges_start: weekStartTime,
        ec_ranges_end: endTime
      }
    case 'month':
      return {
        ec_ranges_start: monthStartTime,
        ec_ranges_end: endTime
      }
  }
}

export default getTime
