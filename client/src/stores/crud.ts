import { defineStore } from 'pinia'
import axios from "axios"

export const useCrud = defineStore('crud', () => {
	async function getDatasFromApi(apiUrl:string, arrayDatas:object[], findItem:number) {
		try {
			let response = (await axios.get(apiUrl)).data
			if (response) {
				arrayDatas.value = response.filter(( item ) => item[findItem] === 2)
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
