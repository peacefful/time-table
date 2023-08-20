import { tutors } from "@/API/api-enterprises-institutions"
import { ref } from "vue"
import axios from "axios"

export const tutorsData = ref<object[]>([])

export async function getTutorsData() {
	const data:object[] = (await axios.get(tutors)).data
	tutorsData.value = data.filter(item => item.userId ===  Number(localStorage.getItem('institutionId')))
}