<script setup lang="ts">
import { ref } from "vue"
import { move } from "@/hooks/useAnimation";
import { institutions, directors } from "../API/api-enterprises-institutions"
import { getData } from "../mixins/getData"
import { outSystem } from "../mixins/outSystem"

const { animationBoolean } = move(500)

const institutionsDatas = ref<object[]>([])
const directorsDatas = ref<object[]>([])

getData(directors, directorsDatas)
getData(institutions, institutionsDatas)

console.log(localStorage.getItem("id"));
</script>

<template>
	<transition>
		<main v-if="animationBoolean" class="main">
			<h3>Добро пожаловать {{ directorsDatas.name }}</h3>
			<div>Ваши записи</div>
			<p>{{ institutionsDatas.appellation }}</p>
		</main>
	</transition>
</template>

<style scoped lang="scss">
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.main {
	text-align: center;
	.main__schedules{
		margin-top: 2%;
	}
}

button {
	@extend %button !optional;
	padding: 1% 2%;
}
</style>@/hooks/useAnimation