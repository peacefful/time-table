import { defineStore } from 'pinia'
import axios from "axios"

export const useCrud = defineStore('crud', () => {

	const instance = axios.create({});
	instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");

	async function postData (apiUrl:string, dataFromPage:object) {
		try {
			await instance.post(apiUrl, dataFromPage)
		} catch (error) {
			console.log(error);
		}
	}
	
	return { postData }
})