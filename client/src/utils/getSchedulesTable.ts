import { monday, tuesday, wednesday, thursday, friday, saturday } from '@/API/api-weekday'

export function getSchedulesTable(
  mondayCouple: object[],
  tuesdayCouple: object[],
  wednesdayCouple: object[],
  thursdayCouple: object[],
  fridayCouple: object[],
  saturdayCouple: object[]
): object[] {
  return [
    { object: mondayCouple, api: monday },
    { object: tuesdayCouple, api: tuesday },
    { object: wednesdayCouple, api: wednesday },
    { object: thursdayCouple, api: thursday },
    { object: fridayCouple, api: friday },
    { object: saturdayCouple, api: saturday }
  ]
}
