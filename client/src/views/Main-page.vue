<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { institutions } from "../API/api-enterprises-institutions"
import { getData } from "../mixins/getData"
import { outSystem } from "../mixins/outSystem"
import ModalForm from "../components/ModalForm.vue"
import { ref } from "vue";

const { animationBoolean } = move(500)
const institutionsDatas:object[] = []

const show = ref<boolean>(false)
const closeModal = () => show.value = false
const openModal = () => show.value = true

getData(institutions, institutionsDatas)
console.log( "uuid", localStorage.getItem("uuid"));
</script>
<template>
	<transition>
		<main v-if="animationBoolean" class="main">
			<h3 style="padding-top: 1%;">Выберите ваше учреждение / организацию</h3>
			<div v-if="institutionsDatas.length">
				{{ institutionsDatas }}
			</div>
			<div style="margin-top: 1%;" v-else>
				<button class="button" @click="openModal()">Добавить организацию</button>
				<transition name="modal">
					<ModalForm @close-modal="closeModal()" v-if="show" />
				</transition>
			</div>
			<button class="button" @click="outSystem()">Выйти</button>
		</main>
	</transition>
</template>

<style scoped lang="scss">
.v-enter-active {
  transition: all 0.3s ease-out;
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
</style>