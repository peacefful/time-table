<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { ref } from 'vue';
import { isEmptyLogin } from '@/utils/isEmptyLogin';
import { groups, students, tutors } from '@/API/api-enterprises-institutions';
import { getData, getDatas } from '@/utils/findItem';
import { getGroup } from '@/API/student';
import { useTutorStore } from '@/API/tutor';
import Header from '@/components/UI/Header.vue';
import Title from "@/components/UI/TitlePage.vue";
import router from '@/router';

const role = localStorage.getItem("role")

const groupsDatas = ref<object[]>([])
const studentGroupId = ref<object[]>([])
const tutorGroupId = ref<object[]>([])

const { findAuthTutor } = useTutorStore()

if (role === "Директор") {
	getDatas(groups, groupsDatas, "institutionId", Number(localStorage.getItem('institutionId')))
} else if (role === "Студент") {
	getData(students, studentGroupId, "id", Number(localStorage.getItem("id")))
	getGroup(groupsDatas)
} else if (role === "Куратор") {
	getData(tutors, tutorGroupId, "id", Number(localStorage.getItem("id")))
	findAuthTutor(groupsDatas)
}

const getIdGroup = (id:number) => {
	localStorage.setItem("addUserGroupId", id.toString())
	router.push({ name: 'showschedule', params: { form: 'schedules' }})
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
						<div style="margin-top: 2%;" v-for="group in groupsDatas" :key="group.id">
							<p @click="getIdGroup(group.id)">{{ group.groupName }}</p>
						</div>
					</div>
					<div v-else style="margin-top: 1%;">
						Групп пока нету, <span @click="router.push({ name: 'newgroup', params: { form: 'add-group' }})">добавьте новую</span>
					</div>
				</div>
				<div v-if="role === 'Куратор'">
					<div style="margin-top: 2%;" v-if="tutorGroupId.groupId === null">
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