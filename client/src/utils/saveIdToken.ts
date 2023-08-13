export const saveIdUser = (token:string, id:string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('id', id);
};