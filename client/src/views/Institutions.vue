<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { groups } from '@/API/api-enterprises-institutions';
import { useCrud } from "../stores/crud"
import { ref } from 'vue';
import { closeOpenModal } from "../components/modal/open-close"
import ModalForm from "../components/modal/ModalForm.vue"

const { show, closeModal, openModal } = closeOpenModal()

const groupsDatas = ref<object[]>([])

const groupName = ref<string>("")
const course = ref<string>("")
const tutorId = 3

const dataForPostMethod = ref<object>({
	groupName,
	course,
	tutorId
})

const crud = useCrud()
crud.getDatasFromApi(groups, groupsDatas, "tutorId")

console.log(localStorage.getItem("id"));

const { animationBoolean } = move(500)
</script>

<template>
	<transition>
		<main style="text-align: center;" v-if="animationBoolean">
			<h3 style="padding-top: 10%;">Выберите группу</h3>
			<div style="padding-top: 1%;" v-for="group in groupsDatas" :key="group.id">
				<p>{{ group.groupName }}</p>
			</div>
			<div style="margin-top: 1%;">
				<button id="add" @click="openModal()">Добавить организацию</button>
				<transition name="modal">
					<ModalForm
						:props-data="crud.postData(groups, dataForPostMethod)"
						v-model:group="groupName"
						v-model:course="course"
						@close-modal="closeModal()"
						page="institution"
						v-if="show"
					/>
				</transition>
			</div>
		</main>
	</transition>
</template>

<style lang="scss" scoped>
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>