<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref<boolean>(true)
defineEmits(['closeModal'])

</script>

<template>
	<div v-if="showModal" class="modal-form">
		<div class="modal-form__box">
			<img @click="$emit('closeModal')" src="../../assets/icons/close-icon.svg">
			<h3>Hello</h3>
		</div>
	</div>
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