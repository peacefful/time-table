<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref<boolean>(true)

defineProps<{
	appellation?: string
}>()

console.log(localStorage.getItem("institutionId"));

defineEmits(['closeModal', 'postData', 'postGroup', 'update:appellation', 'update:group', 'update:course'])
</script>

<template>
	<main v-if="showModal">
		<form class="modal-form" @submit="$emit('postInstitution')">
			<div class="modal-form__box">
				<img @click="$emit('closeModal')" src="../../assets/icons/close-icon.svg">
				<h3>Заполните поля</h3>
				<input 
					type="text" 
					placeholder="Организация"
					@input="$emit('update:appellation', $event.target.value)"
				>
				<button type="submit">Создать</button>
			</div>
		</form>
	</main>
</template>

<style scoped lang="scss">
input {
	margin-top: 4%;
	background-color: rgb(18, 18, 18);
}
</style>