<script setup lang="ts">
import axios from "axios"
import { directors } from "../API/api-urls"
import { ref } from "vue"
import { move } from "../hooks/animation"
import RegistrationLoginUser from "../components/RegistrationLoginUser.vue"

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
			<div class="registration-login__flex">
				<RegistrationLoginUser 
					v-model:name="name"
					v-model:surname="surname"
					v-model:password="password"
				/>
			</div>
			<button type="submit">Зарегистрироваться</button>
			<label><a href="">Войти</a></label>
		</form>
	</main>
	</Transition>
</template>

<style scoped lang="scss">

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

.registration {
	margin-top: 10%;
	display: flex;
	text-align: center;
	justify-content: center;
	.registration-login__flex{
		margin-top: 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
	}
}
</style>