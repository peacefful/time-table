import router from "@/router"
import axios from "axios"
import { authDirectors } from "@/API/api-enterprises-institutions"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const authUser = async (name:string, surname:string, password:string, role:string) => {
	let _name:string = name
	let _surname:string = surname
	let _password:string = password

	try {
		if (role == "") {
			throw new Error("Ошибка, не все поля были заполнены")
		} else {
			if (_name.length >= 2 || _surname.length >= 2 || _password.length >= 8 && symbols.includes(_password)){
				const response = await axios.post(authDirectors, {
					name: _name,
					surname: _surname,
					password: _password,
					role
				})
				
				_name = ""
				_surname = ""
				_password = ""

				const token:string = response.data.token
				localStorage.setItem('token', token);

				const id:string = response.data.id
				localStorage.setItem('id', id);
			
				router.push("/main")
			} else {
				throw new Error("Не корректные данные")
			}
		}
	} catch (error) {
		console.log(error);
	}
}