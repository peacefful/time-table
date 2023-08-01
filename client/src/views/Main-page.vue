<script setup lang="ts">
import { ref } from "vue"
import { move } from "@/hooks/useAnimation";
import { institutions, directors } from "../API/api-enterprises-institutions"
import { getData } from "../mixins/getData"
import router from "@/router"

const { animationBoolean } = move(500)

const institutionsDatas = ref<object[]>([])
const directorsDatas = ref<object[]>([])

getData(institutions, institutionsDatas)
getData(directors, directorsDatas)

const exit = () => {
	localStorage.clear()
	router.push("/")
}

console.log(localStorage.getItem("id"));

</script>

<template>
	<transition>
		<main v-if="animationBoolean" class="main">
			<b>Ваши учреждения / предприятия</b>
			<div>
				{{ directorsDatas }}
			</div>
			<button @click="exit">Выйти</button>
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
}
</style>@/hooks/useAnimation