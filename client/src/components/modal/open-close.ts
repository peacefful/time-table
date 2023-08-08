import { ref } from "vue"

export function closeOpenModal () {
	const show = ref<boolean>(false)
	const closeModal = ():boolean => show.value = false
	const openModal = ():boolean => show.value = true

	return { show, closeModal, openModal }
}