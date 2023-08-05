<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { institutions } from "../API/api-enterprises-institutions"
import { outSystem } from "../mixins/outSystem"
import ModalForm from "../components/ModalForm.vue"
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router";

const institutionsDatas = ref<object[]>([])

interface IItem {
	directorId: number
}

const show = ref<boolean>(false)
const closeModal = () => show.value = false
const openModal = () => show.value = true

async function getInstitution() {
	let response = (await axios.get(institutions)).data
	if (response) {
		institutionsDatas.value = response.filter(( item:IItem ) => item.directorId === Number(localStorage.getItem("id")))
	}
}

getInstitution()

console.log(localStorage.getItem("token"));
console.log(Number(localStorage.getItem("id")));

const { animationBoolean } = move(500)
</script>
<template>
	<transition>
		<main v-if="animationBoolean" class="main">
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

.main{
	text-align: center;
}

button {
	@extend %button !optional;
	padding: 0.5% 3%;
	margin-top: 1%;
}
</style>