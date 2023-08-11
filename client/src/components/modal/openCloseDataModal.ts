export function closeOpenDataModal (dataModal:boolean) {
	const closeDataModal = ():boolean => dataModal.value = false
	const openDataModal = (key?:string, value?:number):boolean => {
		if (key && value) {
			localStorage.setItem(key, value.toString())
			
		}
		return dataModal.value = true
	}

	return { closeDataModal, openDataModal }
}