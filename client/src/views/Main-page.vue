<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { institutions } from "../API/api-enterprises-institutions"
import { outSystem } from "../mixins/outSystem"
import ModalForm from "../components/modal/ModalForm.vue"
import { ref, reactive } from "vue";
import router from "@/router";
import { useCrud } from "../stores/crud"
import { closeOpenModal } from "../components/modal/open-close"

const institutionsDatas = ref<object[]>([])

const { show, closeModal, openModal } = closeOpenModal()

const crud = useCrud()
crud.getDatasFromApi(institutions, institutionsDatas)

console.log(localStorage.getItem("token"));
console.log(Number(localStorage.getItem("id")));

const datas = reactive({
	appelation: "Организация",
})

const { animationBoolean } = move(500)
</script>
<template>
	<transition>
		<main style="text-align: center;" v-if="animationBoolean" class="main">
			<h3 style="padding-top: 10%;">Выберите ваше учреждение / организацию</h3>
			<div style="padding-top: 1%;" v-for="institution in institutionsDatas" :key="institution.id">
				<p @click="router.push({ name: 'institution', params: { appellation: institution.appellation } })">{{ institution.appellation }}</p>
			</div>
			<div style="margin-top: 1%;">
				<button id="add" @click="openModal()">Добавить организацию</button>
				<transition name="modal">
					<ModalForm
						:placeholders="datas"
						@close-modal="closeModal()"
						v-if="show"
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