<script setup lang="ts">
import axios from 'axios';
import { institutions } from '@/API/api-enterprises-institutions';
import { ref } from 'vue';

defineEmits(['closeModal'])

const appellation = ref<string>("")
const showModal = ref<boolean>(false)

const addInstitution = async () => {
	await axios.post(institutions, {
		appellation: appellation.value,
		directorId: parseInt(localStorage.getItem("id"))
	})

	appellation.value = ""
}

</script>

<template>
	<transition name="model">
		<main>
			<form class="modal-form" @submit.prevent="addInstitution()">
				<div class="modal-form__box">
					<img  @click="$emit('closeModal')" src="../assets/icons/close-icon.svg">
					<h3>Введите название организации</h3>
						<div>
							<input type="text" v-model="appellation">
						</div>
					<button @click="addInstitution()">Добавить</button>
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
	margin-top: 13%;
	background-color: rgb(18, 18, 18);
}
main {
	.modal-form {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.665);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		img{
			position: absolute;
			left: 90%;
			top: 4%;
			cursor: pointer;
		}
		.modal-form__box{
			position: relative;
			max-width: 500px;
			background-color: rgb(0, 0, 0);
			border-radius: 4%;
			padding: 5% 10%;
			transition: all 2s;
		}
		button {
			margin-top: 10%;
			padding: 3% 10%;
		}
	}
}
</style>