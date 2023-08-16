import { defineStore } from 'pinia'
import axios from "axios"

export const useCrud = defineStore('crud', () => {
	async function getDatas(apiUrl:string, arrayDatas:object[], id?:number, findItem?:string) {
		try {
			const response = (await axios.get(apiUrl)).data
			if (response) {
				arrayDatas.value = response.filter(item => item[findItem] === id)
			}
		} catch (error) {
			console.log(error);
		}
	}

	const instance = axios.create({});
	instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");

	async function postData (apiUrl:string, dataFromPage:object) {
		try {
			await instance.post(apiUrl, dataFromPage)
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteData(apiUrl:string, id:number) {
		const deleteUrl:string = `${apiUrl}/${id}`
		await instance.delete(deleteUrl)
	}
	
	return { getDatas, postData, deleteData }
})
