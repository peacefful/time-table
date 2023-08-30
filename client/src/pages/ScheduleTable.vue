<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { ref } from 'vue';
import { isEmptyLogin } from '@/utils/isEmptyLogin';
import { students, tutors } from '@/API/api-enterprises-institutions';
import { getData } from '@/utils/findItem';
import { useStudentStore } from "@/stores/studentStore"
import { useDirectorStore } from "@/stores/directorStore"
import { useTutorStore } from "@/stores/tutorStore"
import router from '@/router';
import Header from '@/components/Header.vue';
import Title from '@/components/TitlePage.vue';

const role = localStorage.getItem("role")

const schedulesData = ref<object[]>([])
const groupsHasSchedules = ref<object[]>([])
const student = ref<object[]>([])
const tutor = ref<object[]>([])

const { getStudentSchedules } = useStudentStore()
const { getGroups } = useDirectorStore()
const { getTutorSchedules } = useTutorStore()

if (role === "Студент") {
	getData(students, student, "id", Number(localStorage.getItem("id")))
	getStudentSchedules(schedulesData)
} else if (role === "Директор") {
	getGroups(groupsHasSchedules)
} else if (role === "Куратор") {
	getData(tutors, tutor, "id", Number(localStorage.getItem("id")))
	getTutorSchedules(schedulesData)
}

const getIdGroup = (id:number) => {
	localStorage.setItem("scheduleId", id.toString())
	router.push({ name: 'showschedule', params: { form: 'show-schedules' }})
}

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="isEmptyLogin()">
				<div v-if="role === 'Студент' || role === 'Куратор'">
					<div style="margin-top: 2%;" v-if="student.groupId === null || tutor.groupId === null">
						Вы не состоите в группе
					</div>
					<div v-else>
						<Title title="Расписание" />
						<div v-if="schedulesData.monday">
							<div style="color: rgba(255, 255, 255, 0.763);" class="schedules-flex">
								<div>
									<h3>Понедельник</h3>
									<div v-for="monday in schedulesData.monday" :key="monday.id">
										{{ monday.subject }} ({{ monday.teacher }}) 
										[{{ monday.beginning }}-{{ monday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Вторник</h3>
									<div v-for="tuesday in schedulesData.tuesday" :key="tuesday.id">
										{{ tuesday.subject }} ({{ tuesday.teacher }}) 
										[{{ tuesday.beginning }}-{{ tuesday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Среда</h3>
									<div v-for="wednesday in schedulesData.wednesday" :key="wednesday.id">
										{{ wednesday.subject }} ({{ wednesday.teacher }}) 
										[{{ wednesday.beginning }}-{{ wednesday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Четверг</h3>
									<div v-for="thursday in schedulesData.thursday" :key="thursday.id">
										{{ thursday.subject }} ({{ thursday.teacher }}) 
										[{{ thursday.beginning }}-{{ thursday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Пятница</h3>
									<div v-for="friday in schedulesData.friday" :key="friday.id">
										{{ friday.subject }} ({{ friday.teacher }}) 
										[{{ friday.beginning }}-{{ friday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Суббота</h3>
									<div v-for="saturday in schedulesData.saturday" :key="saturday.id">
										{{ saturday.subject }} ({{ saturday.teacher }}) 
										[{{ saturday.beginning }}-{{ saturday.end }}]
									</div>
								</div>
							</div>
						</div>
						<div v-else style="margin-top: 1%;">
							Расписаний для вашей группе пока нету.
						</div>
					</div>
				</div>
				<div v-else-if="role === 'Директор'">
					<Title title="Расписание" />
					<div style="margin-top: 1%;">
						<div v-if="groupsHasSchedules.length">
							<p @click="router.push({ name:'newschedule', params:{form: 'add-schedules'} })">Добавить расписание</p>
							<div style="margin-top: 2%;" v-for="group in groupsHasSchedules" :key="group.id">
								<p @click="getIdGroup(group.id)">{{ group.groupName }}</p>
							</div>
						</div>
						<div v-else>
							Расписаний пока нету, 
							<span @click="router.push({ name:'newschedule', params:{form: 'add-schedules'} })">
								добавьте новое
							</span>
						</div>
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