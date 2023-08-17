<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { students } from '@/API/api-enterprises-institutions';
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import axios from 'axios';

const studentsData = ref<object[]>([])
async function getStudents() {
	studentsData.value = (await axios.get(students)).data
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