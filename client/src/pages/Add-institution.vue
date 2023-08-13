<script setup lang="ts">
import { institutions } from '@/API/api-enterprises-institutions';
import { move } from '@/hooks/useAnimation';
import Header from '@/components/Header.vue';
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

const institution = ref<string>()
const directordId = Number(localStorage.getItem("id"))

const instance = axios.create({
	baseURL: institutions
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");

async function postInstitutions() {
	try {
		await instance.post(institutions, {
			appellation: institution.value,
			directorId: directordId
		})
		localStorage.setItem("institution", institution.value)
		router.push('/main')
	} catch (error) {
		console.log(error);
	}
}

const { animationBoolean } = move(600)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div class="add-institution">
				<h1>Новое учреждение</h1>
				<form class="add-institution__form" @submit.prevent="postInstitutions()">
					<input type="text" placeholder="Название" v-model="institution">
					<button type="submit">Создать</button>
				</form>
			</div>
		</main>
	</transition>
</template>

<style scoped lang="scss">
.add-institution{
	margin-top: 2%;
	text-align: center;
	.add-institution__form {
		display: flex;
		flex-direction: column;
		align-items: center;
		button {
			margin-top: 1.5%;
		}
	}
}
</style>