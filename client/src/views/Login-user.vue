<script setup lang="ts">
import { move } from "../hooks/useAnimation"
import RegistrationLoginUser from "../components/RegistrationLoginUser.vue"
import ButtonLabel from "../components/ButtonLabel.vue"
import { authDirectors } from "@/API/api-enterprises-institutions"
import { ref } from "vue";
import router from '../router/index'

import { registrationLoginUser } from '../mixins/regAuth'

const { animationBoolean } = move(500)

const name = ref<string>("")
const surname = ref<string>("")
const password = ref<string>("")
const role = ref<string>("")

</script>

<template>
	<Transition name="slide-fade">
		<main v-if="animationBoolean" class="registration">
			<form @submit.prevent="registrationLoginUser('/main', authDirectors, name, surname, password, role)">
				<h3>Вход</h3>
				<div class="registration-login__flex">
					<RegistrationLoginUser 
						v-model:name="name"
						v-model:surname="surname"
						v-model:password="password"
						v-model:role="role"
					/>
				</div>
				<ButtonLabel @url="router.push('/registration')" button="Войти" label="Зарегистрироваться"/>
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
</style>../mixins/reg.auth../mixins/regAuth