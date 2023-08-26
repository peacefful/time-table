<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { institutions, users } from '@/API/api-enterprises-institutions';
import { ref } from 'vue';
import { isEmptyLogin } from "@/utils/isEmptyLogin";
import Header from '@/components/Header.vue';
import Title from '@/components/TitlePage.vue';
import axios from 'axios';

const studentsData = ref<object[]>([])
const institutionId:number = Number(localStorage.getItem("institutionId"))
const role = localStorage.getItem("role")

if (role === "Директор") {
	async function getStudents() {
		const data:object[] = (await axios.get(users)).data
		const ownGroups:object[] = data.find(item => item.institutionId === institutionId)

		const students = ownGroups.students
		students.forEach(student => {
			studentsData.value.push({ 
				name: student.name, 
				surname: student.surname, 
				role: student.role 
			})
		})
	}
	getStudents()
} else if (role === "Студент") {
	async function getStudents() {
		const dataInstitutions:object[] = (await axios.get(institutions)).data
		const appellation = dataInstitutions.find(item => item.appellation === localStorage.getItem("appellation"))
		const usersInstitutionId = appellation.id
		
		const dataUsers:object[] = (await axios.get(users)).data
		const ownUsers = dataUsers.find(users => users.institutionId === usersInstitutionId)
		
		studentsData.value = ownUsers.students
	}
	getStudents()
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