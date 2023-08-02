<script setup lang="ts">
import { ref } from "vue"
import { move } from "@/hooks/useAnimation";
import { institutions, directors } from "../API/api-enterprises-institutions"
import { getData } from "../mixins/getData"
import { outSystem } from "../mixins/outSystem"

const { animationBoolean } = move(500)

const institutionsDatas:object[] = []

getData(institutions, institutionsDatas)

console.log( "uuid", localStorage.getItem("uuid"));
</script>

<template>
	<transition>
		<main v-if="animationBoolean" class="main">
			<h3 style="padding-top: 1%;" >Выберите ваше учреждение</h3>
			<div v-if="institutionsDatas.length">
				{{ institutionsDatas }}
			</div>
			<div v-else>
				<button>Добавить учреждение</button>
			</div>
			<button @click="outSystem()">Выйти</button>
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

.main{
	text-align: center;
}

button {
	@extend %button !optional;
	padding: 0.5% 3%;
	margin-top: 2%;
}
</style>@/hooks/useAnimation