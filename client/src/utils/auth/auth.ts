import router from "@/router"
import { authDirectors, institutions } from "@/API/api-enterprises-institutions"
import { makeAuthRequest } from "@/utils/auth/postData"
import { saveIdUser } from "@/utils/saveIdToken"
import axios from "axios"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const authUser = async (name:string, surname:string, password:string, role:string, groupOrAppellation:string) => {

	try {
		if (role === "") {
			throw new Error("Ошибка, не все поля были заполнены");
		} else {
			if (name.length >= 2 || surname.length >= 2 || (password.length >= 8 && symbols.includes(password))) {
				if (role === "Студент") {
					// eslint-disable-next-line no-inner-declarations
					async function checkInstitutionGroup () {
						const result:object[] = (await axios.get(institutions)).data
						const institution:object = result.find(item => item.appellation === groupOrAppellation)
				
						const groups:object[] = institution.groups
						const studentsGroup = groups.find(item => item.groupName === "Учащиеся")

						const response = await makeAuthRequest(name, surname, password, role, authDirectors, studentsGroup.id);
						if (response && response.token && response.id) {
							saveIdUser(response.token, response.id);
							router.push("/main");
						} else {
							throw new Error("Ответ сервера содержит некорректные данные");
						}
					}
					checkInstitutionGroup()
				} else {
					const response = await makeAuthRequest(name, surname, password, role, authDirectors);
					if (response && response.token && response.id) {
						saveIdUser(response.token, response.id);
						router.push("/main");
					} else {
						throw new Error("Ответ сервера содержит некорректные данные");
					}
				}
			} else {
				throw new Error("Не корректные данные");
			}
		}
	} catch (error) {
		console.log(error);
	}
};