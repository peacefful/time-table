<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { ref } from 'vue';
import { isEmptyLogin } from "@/utils/isEmptyLogin";
import { useStudentStore } from "@/stores/studentStore"
import { useDirectorStore } from "@/stores/directorStore"
import Header from '@/components/Header.vue';
import Title from '@/components/TitlePage.vue';

const studentsData = ref<object[]>([])
const institutionId:number = Number(localStorage.getItem("institutionId"))
const role = localStorage.getItem("role")

const { getStudents } = useStudentStore()
const { getStudentsForDirector } = useDirectorStore()

if (role === "Директор") {
	getStudentsForDirector(studentsData, institutionId)
} else if (role === "Студент" || role === "Куратор") {
	getStudents(studentsData)
}

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="isEmptyLogin()">
				<Title title="Студенты"/>
				<div v-if="studentsData.length">
					<div style="margin-top: 1%;" v-for="student in studentsData" :key="student.id">
						<p>{{ student.name }} {{ student.surname }} ({{ student.role }})</p>
					</div>
				</div>
				<div style="margin-top: 2%;" v-else>Студентов пока нет.</div>
			</div>
			<div v-else>
				<p style="margin-top: 2%; text-align: center;">
					<h2 @click="router.push('/')">
						Войдите
					</h2>
				</p>
			</div>
		</main>
	</transition>
</template>