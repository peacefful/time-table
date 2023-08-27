import { authDirectors, authStudents, authTutors } from "@/API/api-enterprises-institutions";
import axios from "axios";

export const makeAuthRequest = async (name:string, surname:string, password:string, role:string) => {
	try {
		if (role === "Куратор") {
			const response = await axios.post(authTutors, {
				name,
				surname,
				password,
				role
			});
			return response.data;
		} else if (role === "Студент") {
			const response = await axios.post(authStudents, {
				name,
				surname,
				password,
				role
			});
			return response.data;
		} else {
			const response = await axios.post(authDirectors, {
				name,
				surname,
				password,
				role
			});
			return response.data;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
