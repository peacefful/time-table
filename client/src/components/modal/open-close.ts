import { ref } from "vue"

export function closeOpenModal (inputModal:boolean = false, dataModal:boolean = false) {
	const closeInputModal = ():boolean => inputModal.value = false
	const openInputModal = ():boolean => inputModal.value = true

	const closeDataModal = ():boolean => dataModal.value = false
	const openDataModal = ():boolean => dataModal.value = true

	return { closeInputModal, openInputModal, closeDataModal, openDataModal }
}