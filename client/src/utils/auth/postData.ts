import axios from "axios";

export const makeAuthRequest = async (name:string, surname:string, password:string, role:string, authApi:string, groupId?:number) => {
	try {
		if (role === "Куратор" || role === "Студент") {
			const response = await axios.post(authApi, {
				name,
				surname,
				password,
				role,
				groupId: groupId
			});
			return response.data;
		} else {
			const response = await axios.post(authApi, {
				name,
				surname,
				password,
				role,
				groupId
			});
			return response.data;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
