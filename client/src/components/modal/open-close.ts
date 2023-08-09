export function closeOpenModal (inputModal:boolean, dataModal:boolean) {
	const closeInputModal = ():boolean => inputModal.value = false
	const openInputModal = ():boolean => inputModal.value = true

	const closeDataModal = ():boolean => dataModal.value = false
	const openDataModal = (key:string, id:number):boolean => {
		localStorage.setItem(key, id.toString())
		return dataModal.value = true
	}

	return { closeInputModal, openInputModal, closeDataModal, openDataModal }
}