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
	<transition name="model">
		<main>
			<form v-if="showModal" class="modal-form" @submit="$emit('postData')">
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
	</transition>
</template>

<style scoped lang="scss">
.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

input {
	margin-top: 4%;
	background-color: rgb(18, 18, 18);
}

</style>