<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { institutions } from "../API/api-enterprises-institutions"
import { outSystem } from "../mixins/outSystem"
import { ref } from "vue";
import { useCrud } from "../stores/crud"
import { closeOpenModal } from "../components/modal/open-close"
import { selectIdAndPushRouter } from "../handlers/selectId"
import router from "@/router";
import ModalForm from "../components/modal/ModalForm.vue"

const institutionsDatas = ref<object[]>([])
const { show, closeModal, openModal } = closeOpenModal()

const appellation = ref<string>("")
const directorId = Number(localStorage.getItem("id"))

const institutionData = ref<object>({
	appellation,
	directorId
})

const crud = useCrud()
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
				<p @click="selectIdAndPushRouter('institution', { appellation: institution.appellation }, institution.id)">
					{{ institution.appellation }}
				</p>
			</div>
			<div style="margin-top: 1%;">
				<button id="add" @click="openModal()">Добавить организацию</button>
				<transition name="modal">
					<ModalForm
						@post-data="crud.postData(institutions, institutionData)"
						@close-modal="closeModal()"
						v-model:appellation="appellation"
						v-if="show"
						page="main"
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

h3 {
	display: flex;
	justify-content: center;
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