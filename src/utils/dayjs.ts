import dayjs from "dayjs";

// 日期格式化
export function utilsDate(data) {
  return dayjs(data).format('MM月DD日')
}
// 计算相差的天数
export function StayCount(beforeDate, behindDate){
  return dayjs(behindDate).diff(beforeDate, "day")
}
