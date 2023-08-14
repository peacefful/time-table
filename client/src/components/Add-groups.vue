<script setup lang="ts">
import { directors, groups } from "@/API/api-enterprises-institutions";
import router from "@/router";
import axios from "axios";
import { ref } from "vue"

const group = ref<string>("")
const course = ref<string>("")

async function getInstitutionId() {
	const data = (await axios.get(directors)).data
	const director = data.find(item => item.id === Number(localStorage.getItem("id")))
	if (director.institution) {
		localStorage.setItem("institutionId", director.institution.id)
	}
}
getInstitutionId()

const instance = axios.create({
	baseURL : groups
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");

async function addGroup () {
	try {
		await instance.post(groups, {
			groupName: group.value,
			course: course.value,
			institutionId: Number(localStorage.getItem('institutionId'))
		})
		router.push("/groups")
	} catch (error) {
		console.log(error);
	}
}

</script>

<template>
	<main>
		<div class="add-enterprises-institutions">
			<h1>Новая группа</h1>
			<form class="add-enterprises-institutions__form" @submit.prevent="addGroup()">
				<input type="text" placeholder="Группа" v-model="group">
				<input type="text" placeholder="Курс" v-model="course">
				<button type="submit">Создать</button>
			</form>
		</div>
	</main>
</template>