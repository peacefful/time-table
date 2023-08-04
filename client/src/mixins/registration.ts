import router from "@/router"
import { directors } from "@/API/api-enterprises-institutions"
import { makeAuthRequest } from "../utils/auth/postData"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const registrationUser = async (name:string, surname:string, password:string, role:string) => {
	try {
		if (role == "") {
			throw new Error("Ошибка, не все поля были заполнены")
		} else {
			if (name.length >= 2 || surname.length >= 2 || password.length >= 8 && symbols.includes(password)){
				await makeAuthRequest(name, surname, password, role, directors);
				router.push("/")
			} else {
				throw new Error("Не корректные данные")
			}
		}
	} catch (error) {
		console.log(error);
	}
}