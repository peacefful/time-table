<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref<boolean>(true)

defineProps<{
	page: string
	appellation?: string
	group?: string
	course?: string
}>()

defineEmits(['closeModal', 'postData', 'update:appellation', 'update:group', 'update:course'])

</script>

<template>
	<main v-if="showModal">
			<form class="modal-form" @submit="$emit('postData')">
				<div class="modal-form__box">
					<img @click="$emit('closeModal')" src="../../assets/icons/close-icon.svg">
					<h3>Заполните поля</h3>
					<div v-if="page === 'main'">
						<input 
							type="text" 
							placeholder="Организация"
							@input="$emit('update:appellation', $event.target.value)"
						>
					</div>
					<div v-else-if="page === 'institution'">
						<input 
							type="text" 
							placeholder="Группа"
							@input="$emit('update:group', $event.target.value)"
						>
						<input 
							type="text" 
							placeholder="Курс"
							@input="$emit('update:course', $event.target.value)"
						>
					</div>
					<button type="submit">Добавить</button>
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