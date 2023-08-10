<script setup lang="ts">
import { ref } from 'vue';
import { useCrud } from "../../stores/crud"
import { institutions } from '@/API/api-enterprises-institutions';
import InputModal from "@/components/modal/InputModal.vue"
import { closeOpenModal } from "@/components/modal/open-close"

defineProps<{
	aboutIntitutionData: object[]
	apiUrlAboutIntitutionData: string
	localStorageId: string

	apiUrlPostData: string
}>()

defineEmits(['closeModal'])

const showModal = ref<boolean>(true)

const inputModal = ref<boolean>(false)
const dataModal = ref<boolean>(false)
const { openInputModal, closeInputModal } = closeOpenModal(inputModal, dataModal)

const institutionsDatas = ref<object[]>([])
const institutionId = Number(localStorage.getItem("institutionId"))

const crud = useCrud()
crud.getDatasFromApi(institutions, institutionsDatas, Number(localStorage.getItem("id")), "directorId")
</script>

<template>
	<main v-if="showModal">
			<div class="modal-form">
				<div class="modal-form__box">
					<img style="" @click="$emit('closeModal')" src="../../assets/icons/close-icon.svg">
					<div v-for="institution in institutionsDatas" :key="institution.id">
						<h3>{{ institution.appellation }}</h3>
						<div style="margin-top: 5%;">Список групп:
							<p
								style="margin-top: 1%;" 
								v-for="group in institution.groups" 
								:key="group.id">
								{{ group.groupName }} [ {{ group.course }} курс ]
							</p>
						</div>
					</div>
					<button @click="openInputModal" class="modal-form__post">Добавить группу</button>
					<transition name="modal">
						<InputModal
						@close-modal="closeInputModal()"
						v-if="inputModal"
						page="institution"
					/>
					</transition>
					<button class="modal-form__delete" @click="crud.deleteData(institutions, institutionId)">Удалить учреждение</button>
				</div>
			</div>
		</main>
</template>

<style scoped lang="scss">
@import '../../scss/variables.scss';

img:hover {
	opacity: 0.7;
}

.modal-form__post {
	@include button(rgb(13, 255, 0), white);
}
.modal-form__delete {
	@include button(red, white);
}
</style>