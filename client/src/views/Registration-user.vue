<script setup lang="ts">
import { ref } from "vue"
import { move } from "../hooks/animation"
import RegistrationLoginUser from "../components/RegistrationLoginUser.vue"
import ButtonLabel from "../components/UI/ButtonLabel.vue"
import router from '../router/index'

import { addUser } from '../mixins/addData'

const { animationBoolean } = move(500)

const name = ref<string>("")
const surname = ref<string>("")
const password = ref<string>("")

</script>

<template>
	<Transition name="slide-fade">
		<main v-if="animationBoolean" class="registration">
		<form @submit.prevent="addUser(name, surname, password)">
			<h3>Регистрация</h3>
			<div class="registration-login__flex">
				<RegistrationLoginUser 
					v-model:name="name"
					v-model:surname="surname"
					v-model:password="password"
				/>
			</div>
			<ButtonLabel @url="router.push('/')" button="Зарегистрироваться" label="Войти"/>
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
</style>../mixins/addData