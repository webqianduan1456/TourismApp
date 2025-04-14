import dayjs from "dayjs";

// 日期格式化
export function utilsDate(data: string | number | Date | dayjs.Dayjs | null | undefined) {
  return dayjs(data).format('MM月DD日')
}
// 计算相差的天数
export function StayCount(beforeDate:string, behindDate:string){
  return dayjs(behindDate).diff(beforeDate, "day")
}
