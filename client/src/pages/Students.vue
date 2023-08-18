<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { groups } from '@/API/api-enterprises-institutions';
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import axios from 'axios';

const studentsData = ref<object[]>([])
const institutionId:number = Number(localStorage.getItem("institutionId"))

async function getStudents() {
	const data:object[] = (await axios.get(groups)).data
	const ownGroups:object[] = data.filter(item => item.institutionId === institutionId)
	ownGroups.forEach(item => {
		const students:object[] = item.students
		for (const iterator of students) {
			studentsData.value.push({ name: iterator.name, surname: iterator.surname, role: iterator.role })
		}
	})
}

getStudents()

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<Title title="Студенты / Кураторы"/>
			<div v-if="studentsData.length">
				<div style="margin-top: 1%;" v-for="student in studentsData" :key="student.id">
					<p>{{ student.name }} {{ student.surname }} ({{ student.role }})</p>
				</div>
			</div>
			<div style="margin-top: 2%;" v-else>Студентов пока нету</div>
		</main>
	</transition>
</template>