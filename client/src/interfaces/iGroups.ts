import type { ICouples } from "./iCouples"
import type { IUsers } from "./iUsers"

export interface IGroups {
	id: number
	institutionId: number
	course: string
	groupName: string
	monday: ICouples[]
	tuesday: ICouples[]
	wednesday: ICouples[]
	thursday: ICouples[]
	saturday: ICouples[]
	tutors: IUsers[]
	students: IUsers[]
}