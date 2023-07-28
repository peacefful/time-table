<script setup lang="ts">
import { move } from "../hooks/animation"
import RegistrationLoginUser from "../components/RegistrationLoginUser.vue"
import ButtonLabel from "../components/UI/ButtonLabel.vue"
import { ref } from "vue";
import { directors } from "@/API/api-urls";
import axios from "axios";

const { animationBoolean } = move(500)

const name = ref<string>("")
const surname = ref<string>("")
const password = ref<string>("")

const addUser = async () => {
	await axios.post(directors, {
		name: name.value,
		surname: surname.value,
		password: password.value,
		
	})
	name.value = ""
	surname.value = ""
	password.value = ""
}

</script>

<template>
	<Transition name="slide-fade">
		<main v-if="animationBoolean" class="registration">
		<form @submit.prevent="addUser()">
			<h3>Вход</h3>
			<div class="registration-login__flex">
				<RegistrationLoginUser 
					v-model:name="name"
					v-model:surname="surname"
					v-model:password="password"
				/>
			</div>
			<ButtonLabel button="Войти" label="Зарегистрироваться"/>
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
</style>