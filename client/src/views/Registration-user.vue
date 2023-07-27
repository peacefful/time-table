<script setup lang="ts">
import axios from "axios"
import { directors } from "../API/api-urls"
import { ref } from "vue"
import { move } from "../hooks/animation"

const { animationBoolean } = move(500)

const name = ref<string>("")
const surname = ref<string>("")
const password = ref<number | null>()

const addDirector = async () => {
	await axios.post(directors, {
		name: name.value,
		surname: surname.value,
		password: password.value,
	})

	name.value = ""
	surname.value = ""
	password.value = null
}
</script>

<template>
	<Transition name="slide-fade">
		<main v-if="animationBoolean" class="registration">
		<form @submit.prevent="addDirector()">
			<h3>Регистрация</h3>
			<div class="registration__flex">
				<input placeholder="Ваше имя" type="text" v-model="name">
				<input placeholder="Ваша фамилия" type="text" v-model="surname">
				<input placeholder="Пароль" type="password" v-model="password">
				<button type="submit">Зарегистрироваться</button>
			</div>
		</form>
	</main>
	</Transition>
</template>

<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

input {
	padding: 2% 5%;
	margin-top: 2%;
	border-radius: 15px;
}

.registration {
	margin-top: 10%;
	display: flex;
	text-align: center;
	justify-content: center;
	.registration__flex{
		margin-top: 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
	}
}
</style>