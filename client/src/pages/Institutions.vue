<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { groups } from '@/API/api-enterprises-institutions';
import { useCrud } from "../stores/crud"
import { ref } from 'vue';
import { closeOpenModal } from "../components/modal/open-close"
import ModalForm from "../components/modal/InputModal.vue"

const groupsDatas = ref<object[]>([])
const { modal, close, open } = closeOpenModal()

const groupName = ref<string>("")
const course = ref<string>("")
const institutionId:number = Number(localStorage.getItem("institutionId"))

const groupData = ref<object>({
	groupName,
	course,
	institutionId
})

const crud = useCrud()
crud.getDatasFromApi(groups, groupsDatas, institutionId, "institutionId")

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
				<button id="add" @click="open()">Добавить организацию</button>
				<transition name="modal">
					<ModalForm
						@post-data="crud.postData(groups, groupData)"
						@close-modal="close()"
						v-model:group="groupName"
						v-model:course="course"
						v-if="modal"
						page="institution"
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
</style>../components/modals/open-close../components/modals/InputModal.vue