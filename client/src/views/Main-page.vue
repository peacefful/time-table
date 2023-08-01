<script setup lang="ts">
import { ref } from "vue"
import { move } from "@/hooks/useAnimation";
import { institutions, directors } from "../API/api-enterprises-institutions"
import axios from "axios";
import { getData } from "../mixins/getData"

const { animationBoolean } = move(500)

const institutionsDatas = ref<object[]>([])
const directorsDatas = ref<object[]>([])

const getInstitutions = async () => {
	institutionsDatas.value = (await axios.get(institutions)).data
}

getData(directors, directorsDatas)
getInstitutions()

</script>

<template>
	<header>
	</header>
	<transition>
		<main v-if="animationBoolean">
			Lorem ipsum dolor sit amet.
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