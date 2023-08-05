<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { institutions } from "../API/api-enterprises-institutions"
import { outSystem } from "../mixins/outSystem"
import ModalForm from "../components/ModalForm.vue"
import { ref } from "vue";
import router from "@/router";
import { getInstitution } from "../mixins/getDatas"

const institutionsDatas = ref<object[]>([])

const show = ref<boolean>(false)
const closeModal = () => show.value = false
const openModal = () => show.value = true

getInstitution(institutions, institutionsDatas)

console.log(localStorage.getItem("token"));
console.log(Number(localStorage.getItem("id")));

const { animationBoolean } = move(500)
</script>
<template>
	<transition>
		<main style="text-align: center;" v-if="animationBoolean" class="main">
			<h3 style="padding-top: 1%;">Выберите ваше учреждение / организацию</h3>
			<div style="padding-top: 1%;" v-for="institution in institutionsDatas" :key="institution.id">
				<p @click="router.push({ name: 'institution', params: { appellation: institution.appellation } })" >{{ institution.appellation }}</p>
			</div>
			<div style="margin-top: 1%;">
				<button id="add" class="button" @click="openModal()">Добавить организацию</button>
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

button {
	@extend %button !optional;
	padding: 0.5% 3%;
	margin-top: 1%;
}
</style>