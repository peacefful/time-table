import { defineStore } from 'pinia'
import axios from "axios"

interface IItem {
	directorId: number
}

export const useCrud = defineStore('crud', () => {
	async function getDatasFromApi(apiUrl:string, arrayDatas:object[]) {
		try {
			let response = (await axios.get(apiUrl)).data
			if (response) {
				arrayDatas.value = response.filter(( item:IItem ) => item.directorId === Number(localStorage.getItem("id")))
			}
		} catch (error) {
			console.log(error);
		}
	}

	const instance = axios.create({});
	instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");

	const postData = async (apiUrl:string, dataFromPage:object) => {
		try {
			await instance.post(apiUrl, dataFromPage)
		} catch (error) {
			console.log(error);
		}
	}
	
	return { getDatasFromApi, postData }
})
