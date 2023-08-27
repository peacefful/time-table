<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { outSystem } from '@/utils/outSystem';
import { ref } from 'vue';
import { directors, groups, students, tutors } from '@/API/api-enterprises-institutions';
import axios from 'axios';

const user = ref<object[]>([])
const appellation = ref<string>()
const role = localStorage.getItem("role")
const group = ref<string>()

if (role === "Директор") {
	async function getUserData() {
		const dataUser:object[] = (await axios.get(directors)).data
		user.value = dataUser.find(item => item.id === Number(localStorage.getItem("id")))
		appellation.value = user.value.institution.appellation
	}

	getUserData()
} else if (role === "Студент") {
	async function getUserData() {
		try {
			const dataUser:object[] = (await axios.get(students)).data
			user.value = dataUser.find(item => item.id === Number(localStorage.getItem("id")))
			
			const dataGroup:object[] = (await axios.get(groups)).data
			const ownGroup:object = dataGroup.find(group => group.id === user.value.groupId)
			
			group.value = ownGroup.groupName
		} catch (error) {
			console.log(error);
		}
	}
	getUserData()
} else if (role === "Куратор") {
	async function getUserData() {
		try {
			const dataUser:object[] = (await axios.get(tutors)).data
			user.value = dataUser.find(item => item.id === Number(localStorage.getItem("id")))
			
			const dataGroup:object[] = (await axios.get(groups)).data
			const ownGroup:object = dataGroup.find(group => group.id === user.value.groupId)
			
			group.value = ownGroup.groupName
		} catch (error) {
			console.log(error);
		}
	}
	getUserData()
}

</script>

<template>
	<main class="main">
		<div class="main__wrapper">
			<div>Ваше имя: {{ user.name }}</div>
			<div>Ваша фамилия: {{ user.surname }}</div>
			<div>Ваша должность: {{ user.role }}</div>
			<div v-if="role === 'Директор'">
				<div>Ваше учреждение: {{ appellation }}</div>
			</div>
			<div v-if="role === 'Студент' || role === 'Куратор'">
				<div v-if="group === undefined">
					Ваша группа: не указана
				</div>
				<div v-else>
					<div>Ваша группа: {{ group }}</div>
				</div>
			</div>
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