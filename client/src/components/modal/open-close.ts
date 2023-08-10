export function closeOpenModal (dataModal:boolean, inputModal:boolean) {
	const closeInputModal = ():boolean => inputModal.value = false
	const openInputModal = ():boolean => inputModal.value = true
		
	const closeDataModal = ():boolean => dataModal.value = false
	const openDataModal = (key:string, value:number):boolean => {
		localStorage.setItem(key, value.toString())
		return dataModal.value = true
	}

	return { closeInputModal, openInputModal, closeDataModal, openDataModal }
}