<script setup lang="ts">
import { outSystem } from '@/utils/outSystem';
import { ref } from 'vue';
import axios from 'axios';
import { directors } from '@/API/api-enterprises-institutions';

const user = ref<object>()

async function getUserData() {
	const data:object[] = (await axios.get(directors)).data
	user.value = data.find(item => item.id === Number(localStorage.getItem("id")))
}

getUserData()

</script>

<template>
	<main class="main">
		<div class="main__wrapper">
			<div>Ваше имя: {{ user.name }}</div>
			<div>Ваша фамилия: {{ user.surname }}</div>
			<div>Ваша должность: {{ user.role }}</div>
			<div>Ваше учреждение: {{ user.institution.appellation }}</div>
			<button @click="outSystem()">Выйти</button>
		</div>
	</main>
</template>

<style scoped lang="scss">
.main {
	.main__wrapper{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		div{
			color: rgba(240, 255, 255, 0.579);
			margin-top: 1%;
			&:hover {
				color: white;
			}
		}
		button {
			margin-top: 2%;
		}
	}
}
</style>