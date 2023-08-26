import { authDirectors, institutions } from "@/API/api-enterprises-institutions"
import { makeAuthRequest } from "@/utils/auth/authData"
import router from "@/router"
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
						const institution:object|undefined = result.find(item => item.appellation === groupOrAppellation)
						const groups:object[] = institution.users
						const response = await makeAuthRequest(name, surname, password, role, authDirectors, groups.institutionId);

						if (response) {
							localStorage.setItem("appellation", groupOrAppellation)
							localStorage.setItem("token", response.token)
							localStorage.setItem("id", response.id)
							localStorage.setItem("role", response.role)
							router.push("/main");
						} else {
							throw new Error("Ответ сервера содержит некорректные данные");
						}
					}
					checkInstitutionGroup()
				} else {
					const response = await makeAuthRequest(name, surname, password, role);

					if (response) {
						localStorage.setItem("token", response.token)
						localStorage.setItem("id", response.id)
						localStorage.setItem("role", response.role)
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