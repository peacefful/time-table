import { ref } from "vue"

export function closeOpenModal () {
	const show = ref<boolean>(false)
	const closeModal = () => show.value = false
	const openModal = () => show.value = true

	return { show, closeModal, openModal }
}