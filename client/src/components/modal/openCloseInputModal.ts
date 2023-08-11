export function closeOpenInputModal (inputModal:boolean) {
	const closeInputModal = ():boolean => inputModal.value = false
	const openInputModal = ():boolean => inputModal.value = true
	
	return { closeInputModal, openInputModal }
}