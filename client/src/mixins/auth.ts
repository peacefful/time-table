import router from "@/router"
import { authDirectors } from "@/API/api-enterprises-institutions"
import { makeAuthRequest } from "@/utils/auth/postData"
import { saveDataToLocalStorage } from "@/utils/saveIdToken"

const symbols:string[] = ["!", "@", "#", "$", "%", "^", "&", "*", "_"]

export const authUser = async (name:string, surname:string, password:string, role:string) => {
	try {
		if (role === "") {
			throw new Error("Ошибка, не все поля были заполнены");
		} else {
			if (name.length >= 2 || surname.length >= 2 || (password.length >= 8 && symbols.includes(password))) {
				const response = await makeAuthRequest(name, surname, password, role, authDirectors);
			if (response && response.token && response.id) {
				saveDataToLocalStorage(response.token, response.id);
				router.push("/main");
			} else {
				throw new Error("Ответ сервера содержит некорректные данные");
			}
		} else {
			throw new Error("Не корректные данные");
		}
		}
	} catch (error) {
		console.log(error);
	}
};