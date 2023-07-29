import { directors } from "@/API/api-enterprises-institutions"
import axios from "axios"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const addUser = async (name:string, surname:string, password:string) => {
	let _name:string = name
	let _surname:string = surname
	let _password:string = password

	try {
		if (_name.length >=2 || _surname.length >= 2 || _password.length >= 8 && symbols.includes(_password)){
			await axios.post(directors, {
				name: _name,
				surname: _surname,
				password: _password,
			})
			
			_name = ""
			_surname = ""
			_password = ""
		} else {
			throw new Error("Данные не корректные")
		}
	} catch (error) {
		console.log(error);
	}
}