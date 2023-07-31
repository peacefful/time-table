import { directors } from "@/API/api-enterprises-institutions"
import axios from "axios"
import router from "@/router"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const addUser = async (name:string, surname:string, password:string, role:string) => {
	let _name:string = name
	let _surname:string = surname
	let _password:string = password
	let _role:string = role

	try {
		if (_name.length >= 2 || _surname.length >= 2 || _role !== "Ваша должность" || _password.length >= 8 && symbols.includes(_password)){
			await axios.post(directors, {
				name: _name,
				surname: _surname,
				password: _password,
				role: _role,
			})
			
			_name = ""
			_surname = ""
			_password = ""
			_role = ""

			router.push("/main")
		} else {
			throw new Error("Данные не корректные")
		}
	} catch (error) {
		console.log(error);
	}
}