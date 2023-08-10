<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { institutions, groups } from "../API/api-enterprises-institutions"
import { outSystem } from "../mixins/outSystem"
import { ref } from "vue";
import { useCrud } from "../stores/crud"
import { closeOpenModal } from "../components/modal/open-close"
import InputModal from "../components/modal/InputModal.vue"
import DataModal from "../components/modal/DataModal.vue"

const inputModal = ref<boolean>(false)
const dataModal = ref<boolean>(false)
const { openDataModal, closeDataModal, openInputModal, closeInputModal } = closeOpenModal(dataModal, inputModal)

const appellation = ref<string>("")
const directorId:number = Number(localStorage.getItem("id"))
const institutionData = ref<object>({
	appellation,
	directorId
})

const crud = useCrud()
const institutionsDatas = ref<object[]>([])
crud.getDatasFromApi(institutions, institutionsDatas, directorId, "directorId")

console.log(localStorage.getItem("token"));
console.log(Number(localStorage.getItem("id")));

const { animationBoolean } = move(500)
</script>
<template>
	<transition>
		<main style="text-align: center;" v-if="animationBoolean" class="main">
			<h3 style="padding-top: 10%;">Выберите ваше учреждение / организацию</h3>
			<div style="padding-top: 1%;" v-for="institution in institutionsDatas" :key="institution.id">
				<p @click="openDataModal('institutionId', institution.id)">
					{{ institution.appellation }}
				</p>
				<transition name="modal">
					<DataModal
						@close-modal="closeDataModal()"
						v-if="dataModal"
					/>
				</transition>
			</div>
			<div v-if="!institutionsDatas.length">
				<button @click="openInputModal()">Добавить организацию</button>
				<transition name="modal">
					<InputModal
						@post-institution="crud.postData(institutions, institutionData)"
						@close-modal="closeInputModal()"
						v-model:appellation="appellation"
						v-if="inputModal"
						modal="main"
					/>
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

h3 {
	display: flex;
	justify-content: center;
}

button {
	padding: 0.5% 3%;
	margin-top: 1%;
}
</style>