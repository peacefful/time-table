import router from "@/router"
import { directors, institutions, students } from "@/API/api-enterprises-institutions"
import { makeAuthRequest } from "./postData"
import axios from "axios"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const registrationUser = async (name:string, surname:string, password:string, role:string, groupOrAppellation:string) => {
	try {
		if (role == "") {
			throw new Error("Ошибка, не все поля были заполнены")
		} else {
			if (name.length >= 2 || surname.length >= 2 || password.length >= 8 && symbols.includes(password)){
				if (role === "Студент" || role === "Куратор") {
					// eslint-disable-next-line no-inner-declarations
					async function registrationStudentsTutors() {
						const result:object[] = (await axios.get(institutions)).data
						const institution:object = result.find(item => item.appellation === groupOrAppellation)
				
						const groups:object[] = institution.groups
						const studentsTutorsGroup = groups.find(item => item.groupName === "Учащиеся")
						await makeAuthRequest(name, surname, password, role, students, studentsTutorsGroup.id);

						router.push("/");
					}
					registrationStudentsTutors()
				} else {
					await makeAuthRequest(name, surname, password, role, directors);
					router.push("/");
				}
			} else {
				throw new Error("Не корректные данные")
			}
		}
	} catch (error) {
		console.log(error);
	}
}