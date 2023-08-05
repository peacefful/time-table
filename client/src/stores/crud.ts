import { ref, computed } from 'vue'
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

	async function createDatas(apiUrl:string, ...data:object[]) {
		try {
			await axios.post(apiUrl, {
				...data
			})
		} catch (error) {
			console.log(error);
			
		}
	}

	return { getDatasFromApi, createDatas }
})
