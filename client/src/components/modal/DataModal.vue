<script setup lang="ts">
import { ref } from 'vue';
import { useCrud } from "../../stores/crud"
import { institutions } from '@/API/api-enterprises-institutions';
import { closeOpenInputModal } from "@/components/modal/openCloseInputModal"
import InputModal from './InputModal.vue';
import router from '@/router';

const inputModal = ref<boolean>(false)

const { closeInputModal } = closeOpenInputModal(inputModal)
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
					<div v-for=" institution in institutionsDatas" :key="institution.id">
						<h3 >{{ institution.appellation }}</h3>
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
							modal="group"
							v-if="inputModal"
						/>
					</transition>
					<button class="modal-form__delete">Удалить учреждение</button>
				</div>
			</div>
		</main>
</template>

<style scoped lang="scss">
@import '../../scss/variables.scss';
.modal-form__post {
	@include button(rgb(0, 255, 34), white);
}
.modal-form__delete {
	@include button(red, white);
}
</style>@/components/modal/openCloseDataModal