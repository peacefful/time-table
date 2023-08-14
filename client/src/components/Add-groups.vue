<script setup lang="ts">
import { directors } from "@/API/api-enterprises-institutions";
import axios from "axios";
import { ref } from "vue"

const group = ref<string>("")
const course = ref<string>("")

async function getDirectorsId() {
	const data = (await axios.get(directors)).data
	const director = data.find(item => item.id === Number(localStorage.getItem("id")))
	if (director.institution) {
		console.log(director.institution.id);
	}
}

getDirectorsId()
</script>

<template>
	<main>
		<div class="add-enterprises-institutions">
			<h1>Новая группа</h1>
			<form class="add-enterprises-institutions__form">
				<input type="text" placeholder="Группа" v-model="group">
				<input type="text" placeholder="Курс" v-model="course">
				<button type="submit">Создать</button>
			</form>
		</div>
	</main>
</template>