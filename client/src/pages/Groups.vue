<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { ref } from 'vue';
import { isEmptyLogin } from '@/utils/isEmptyLogin';
import { groups, institutions, students } from '@/API/api-enterprises-institutions';
import router from "@/router";
import Header from '@/components/Header.vue';
import Title from "@/components/TitlePage.vue";
import axios from 'axios';

const role = localStorage.getItem("role")

const groupsDatas = ref<object[]>([])
const groupName = ref<string>()
const studentGroupId = ref<object[]>([])

if (role === "Директор") {
	async function getGroups() {
		const data:object[] = (await axios.get(groups)).data
		groupsDatas.value = data.filter(item => item.institutionId === Number(localStorage.getItem('institutionId')))
	}

	getGroups()
} else if (role === "Студент") {
	async function getStudent() {
		const data:object[] = (await axios.get(students)).data
		studentGroupId.value = data.find(item => item.id === Number(localStorage.getItem("id")))
	}

	getStudent()

	async function getGroup() {
		try {
			const data:object[] = (await axios.get(groups)).data
			groupsDatas.value = data.find(item => {
				const students:object[] = item.students
				return students.find(student => student.id === Number(localStorage.getItem("id")))
			})
			

			// const data:object[] = (await axios.get(groups)).data
			// data.find(item => {
			// 	groupName.value = item.groupName
			// 	const students:object[] = item.students
			// 	for (const student of students) {
			// 		groupsDatas.value.push({
			// 			name: student.name,
			// 			surname: student.surname,
			// 			role: student.role,
			// 		})
			// 	}
			// })
		} catch (error) {
			console.log(error);
		}
	}
	getGroup()
}


const { animationBoolean } = move(500)
</script>

<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="isEmptyLogin()">
				<div v-if="role === 'Студент'">
					<div style="margin-top: 2%;" v-if="studentGroupId.groupId === null">
						Подождите пока вас добавят в группу
					</div>
					<div v-else>
						<Title :title="groupsDatas.groupName"/>
						<p 
							style="margin-top: 1%;"
							v-for="student in groupsDatas.students" 
							:key="student.id"
						>
							{{ student.name }} {{ student.surname }} ({{ student.role }})
						</p>
					</div>
				</div>
				<div v-if="role === 'Директор'">
					<Title title="Все группы"/>
					<div v-if="groupsDatas.length">
						<p
							style="padding-top: 1%;"
							@click="router.push({ name: 'newgroup', params: { form: 'add-group' }})"
						>
							Создать группу
						</p>
						<div style="margin-top: 4%;">
							<div style="margin-top: 1%;" v-for="group in groupsDatas" :key="group.id">
								<p>{{ group.groupName }}</p>
							</div>
						</div>
					</div>
					<div v-else style="margin-top: 1%;">
						Групп пока нету, <span @click="router.push({ name: 'newgroup', params: { form: 'add-group' }})">добавьте новую</span>
					</div>
				</div>
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