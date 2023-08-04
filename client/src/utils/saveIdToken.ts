export const saveDataToLocalStorage = (token:string, id:string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('id', id);
};