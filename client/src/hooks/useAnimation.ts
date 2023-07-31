import { ref, onMounted } from "vue"

export function move(ms: number) {
	const animationBoolean = ref<boolean>(false)
	onMounted(() => {
		setTimeout(() => {
			animationBoolean.value = true
		}, ms);
	})
	return { animationBoolean }
}