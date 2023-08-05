import axios from "axios"

interface IItem {
	directorId: number
}

export async function getInstitution(apiUrl:string, arrayDatas:object[]) {
	let response = (await axios.get(apiUrl)).data
	if (response) {
		arrayDatas.value = response.filter(( item:IItem ) => item.directorId === Number(localStorage.getItem("id")))
	}
}