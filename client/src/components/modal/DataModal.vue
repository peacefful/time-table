<script setup lang="ts">
import { ref } from 'vue';
import { useCrud } from "../../stores/crud"
import { institutions, groups } from '@/API/api-enterprises-institutions';
import { closeOpenModal } from "@/components/modal/open-close"
import InputModal from './InputModal.vue';
import router from '@/router';

const dataModal = ref<boolean>(false)
const inputModal = ref<boolean>(false)
const { closeInputModal } = closeOpenModal(dataModal, inputModal)

const showModal = ref<boolean>(true)

defineEmits(['closeModal'])

const institutionsDatas = ref<object[]>([])
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
								:key="group.id"
								:title="`${group.course} курс`"
							>
								{{ group.groupName }} 
							</p>
						</div>
					</div>
					<button @click="router.push('/newgroup')" class="modal-form__post">Создать группу</button>
					<transition name="modal">
						<InputModal
							@close-modal="closeInputModal()"
							v-if="inputModal"
							modal="group"
						/>
					</transition>
					<button class="modal-form__delete">Удалить учреждение</button>
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
	@include button(rgb(0, 255, 34), white);
}
.modal-form__delete {
	@include button(red, white);
}
</style>