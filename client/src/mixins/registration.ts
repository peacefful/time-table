import router from "@/router"
import axios from "axios"
import { directors } from "@/API/api-enterprises-institutions"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const registrationUser = async (name:string, surname:string, password:string, role:string) => {
	let _name:string = name
	let _surname:string = surname
	let _password:string = password

	try {
		if (role == "") {
			throw new Error("Ошибка, не все поля были заполнены")
		} else {
			if (_name.length >= 2 || _surname.length >= 2 || _password.length >= 8 && symbols.includes(_password)){
				await axios.post(directors, {
					name: _name,
					surname: _surname,
					password: _password,
					role
				})
				
				_name = ""
				_surname = ""
				_password = ""
			
				router.push("/")
			} else {
				throw new Error("Не корректные данные")
			}
		}
	} catch (error) {
		console.log(error);
	}
}