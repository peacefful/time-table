import { directors } from "@/API/api-urls"
import axios from "axios"

export const addUser = async (name:string, surname:string, password:string) => {
	let _name:string = name
	let _surname:string = surname
	let _password:string = password

	await axios.post(directors, {
		name: _name,
		surname: _surname,
		password: _password,
	})
	
	_name = ""
	_surname = ""
	_password = ""
}