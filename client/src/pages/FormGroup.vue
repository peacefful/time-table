<script setup lang="ts">
import { groups, tutors } from '@/API/api-enterprises-institutions';
import { useCrud } from '@/stores/crud';
import { move } from '@/hooks/useAnimation';
import { ref } from "vue"
import { closeOpenDataModal } from '@/components/modal/openCloseDataModal';
import SelectStudents from "../components/modal/SelectStudents.vue"
import axios from 'axios';

const dataModal = ref<boolean>()
const { openDataModal, closeDataModal } = closeOpenDataModal(dataModal) 

const crud = useCrud()
const tutorsData = ref<object[]>([])
crud.getDatasFromApi(tutors, tutorsData)

const groupName = ref<string>("")
const course = ref<string>("")

const addgroup = async () => {
	await axios.post(groups, {
		groupName: groupName.value,
		course: course.value,
		institutionId: Number(localStorage.getItem("institutionId"))
	})
}

const { animationBoolean } = move(500)
</script>

<template>
	<transition name="modal">
		<main v-if="animationBoolean" class="form-group">
			<form @submit="addgroup()">
				<h3>Заполните поля</h3>
				<div class="form-group__flex">
					<input type="text" v-model="groupName" placeholder="Группа">
					<input type="text" v-model="course" placeholder="Курс">
					<select>
						<option 
							v-for="tutor in tutorsData" 
							:key="tutor.id" 
							:value="tutor.name"
						>
							{{ tutor.surname }} {{ tutor.name }}
						</option>
					</select>
					<button 
						class="form-group__post" 
						@click.prevent="openDataModal()" 
						style="margin-top: 5%;"
					>
						Добавить студентов
					</button>
					<transition name="modal">
						<SelectStudents
							@close-modal="closeDataModal()"
							v-if="dataModal"
						/>
					</transition>
					<button style="margin-top: 5%;">Создать</button>
				</div>
			</form>
		</main>
	</transition>
</template>

<style scoped lang="scss">
@import "../scss/variables.scss";

select{
	padding: 2%;
}
.form-group__post{
	@include button(rgb(0, 231, 0), white)
}
.form-group {
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	padding-top: 5%;
	background-color: rgba(0, 0, 0, 0.304);
	display: flex;
	justify-content: center;
	overflow-y: auto;
	.form-group__flex {
		
		max-height: 90vh;
		margin-top: 4%;
		display: flex;
		flex-direction: column;
	}
}
</style>@/components/modal/openCloseDataModal