<script setup lang="ts">
import { institutions, users } from '@/API/api-enterprises-institutions';
import { ref } from 'vue';
import router from '@/router';
import axios from 'axios';

const institution = ref<string>()
const directorId = Number(localStorage.getItem("id"))

const instance = axios.create({
	baseURL: institutions
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");

async function postInstitutions() {
	try {
		await instance.post(institutions, {
			appellation: institution.value,
			directorId: directorId
		}).then(async () => {
			await axios.post(users, {
				name: "Учащиеся",
				institutionId: directorId
			})
		})
		localStorage.setItem("directorId", directorId.toString())
		localStorage.setItem("appellation", institution.value)
		router.push('/main')
	} catch (error) {
		console.log(error);
	}
}
</script>
<template>
	<main>
		<div class="add-enterprises-institutions">
			<h1>Новое учреждение</h1>
			<form class="add-enterprises-institutions__form" @submit.prevent="postInstitutions()">
				<input 
					type="text" 
					placeholder="Название"
					v-model="institution"
				>
				<button type="submit">Создать</button>
			</form>
		</div>
	</main>
</template>