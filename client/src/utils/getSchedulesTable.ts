import { monday, tuesday, wednesday, thursday, friday, saturday } from '@/API/apiWeekday'
import type { ICouples } from '@/interfaces/iCouples'

export function getSchedulesTable(
  mondayCouple: ICouples[],
  tuesdayCouple: ICouples[],
  wednesdayCouple: ICouples[],
  thursdayCouple: ICouples[],
  fridayCouple: ICouples[],
  saturdayCouple: ICouples[]
): { object: ICouples[], api: string }[] {
  return [
    { object: mondayCouple, api: monday },
    { object: tuesdayCouple, api: tuesday },
    { object: wednesdayCouple, api: wednesday },
    { object: thursdayCouple, api: thursday },
    { object: fridayCouple, api: friday },
    { object: saturdayCouple, api: saturday }
  ]
}
