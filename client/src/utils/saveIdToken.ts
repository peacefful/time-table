export const saveIdUser = (token:string, id:string, role:string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('id', id);
	localStorage.setItem('role', role);
};