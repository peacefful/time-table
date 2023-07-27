<script setup lang="ts">
import { directors } from "../API/api-urls"
import axios from "axios"
import { ref } from "vue"

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
	<main class="registration">
		<form @submit.prevent="addDirector()">
			<div class="registration__flex">
				<p>Регистрация</p>
				<input placeholder="Ваше имя" type="text" v-model="name">
				<input placeholder="Ваше фамилия" type="text" v-model="surname">
				<input placeholder="Пароль" type="password" v-model="password">
				<button type="submit">Зарегистрироваться</button>
			</div>
		</form>
	</main>
</template>

<style scoped>

input {
	padding: 2% 5%;
	margin-top: 2%;
	border-radius: 15px;
}

.registration {
	margin-top: 10%;
	display: flex;
	justify-content: center;
	.registration__flex{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
	}
}
</style>