<script setup lang="ts">
import { ref } from 'vue';
import { useCrud } from "../../stores/crud"
import { institutions } from '@/API/api-enterprises-institutions';

const showModal = ref<boolean>(true)
const institutionsDatas = ref<object[]>([])

defineEmits(['closeModal'])

const crud = useCrud()
crud.getDatasFromApi(institutions, institutionsDatas, Number(localStorage.getItem("id")), "directorId")
</script>

<template>
	<main v-if="showModal">
			<div class="modal-form">
				<div class="modal-form__box">
					<img @click="$emit('closeModal')" src="../../assets/icons/close-icon.svg">
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
					<button>Удалить учреждение</button>
				</div>
			</div>
		</main>
</template>

<style scoped lang="scss">
@import '../../scss/variables.scss';

button {
	@include button(red, white);
}
</style>