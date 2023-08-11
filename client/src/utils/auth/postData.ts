import axios from "axios";

export const makeAuthRequest = async (name:string, surname:string, password:string, role:string, authDirectors:string, groupId?:number) => {
	try {
		const response = await axios.post(authDirectors, {
			name,
			surname,
			password,
			role,
			groupId
		});
 
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
