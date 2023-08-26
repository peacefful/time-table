<script setup lang="ts">
import { changeGroupStudents, groups, institutions } from "@/API/api-enterprises-institutions";
import { ref } from "vue"
import router from "@/router";
import axios from "axios";
import SelectStudentsTutors from "./SelectStudentsTutors.vue";

const group = ref<string>()
const course = ref<string>()

// async function getInstitutionId() {
// 	const data = (await axios.get(institutions)).data
// 	const institution = data.find(item => item.directorId === Number(useData.id))
// 	localStorage.setItem("institutionId", institution.id)
// }

// getInstitutionId()

const ids = ref<string[]>([])

async function addGroup () {
	try {
		await axios.post(groups, {
			groupName: group.value,
			course: course.value,
			institutionId: Number(localStorage.getItem("institutionId"))
		}).then(res => localStorage.setItem("groupId", res.data.id))
		ids.value.forEach(async item => {
			const putUrl:string = `${changeGroupStudents}/${item}`
			await axios.put(putUrl, {
				groupId: Number(localStorage.getItem("groupId"))
			})
			router.push("/groups")
		})
		router.push("/groups")
	} catch (error) {
		console.log(error);
	}
}

const isShowModal = ref<boolean>()
const openModal = () => isShowModal.value = true
const closeModal = () => isShowModal.value = false
</script>

<template>
	<main>
		<div class="add-enterprises-institutions">
			<h1>Новая группа</h1>
			<form class="add-enterprises-institutions__form" @submit.prevent="addGroup()">
				<input type="text" placeholder="Группа" v-model="group">
				<input style="margin-top: 1%;" type="text" placeholder="Курс" v-model="course">
				<button @click.prevent="openModal()">Добавить студентов</button>
				<SelectStudentsTutors
					v-model:ids="ids"
					@close-modal="closeModal()"
					v-if="isShowModal" 
					style="margin-top: 1%;"
				/>
				<button type="submit">Создать</button>
			</form>
		</div>
	</main>
</template>