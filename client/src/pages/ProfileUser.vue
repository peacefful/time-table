<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { outSystem } from '@/utils/outSystem';
import { ref } from 'vue';
import { directors, groups, students, tutors } from '@/API/api-enterprises-institutions';
import { useStudentStore } from "@/stores/studentStore"
import { useDirectorStore } from "@/stores/directorStore"
import { useTutorStore } from "@/stores/tutorStore"
import axios from 'axios';

const user = ref<object[]>([])
const appellation = ref<string>()
const role = localStorage.getItem("role")
const group = ref<string>()

const { getStudentData } = useStudentStore()
const { getDirectorData } = useDirectorStore()
const { getTutorData } = useTutorStore()

if (role === "Директор") {
	getDirectorData(user, appellation)
} else if (role === "Студент") {
	getStudentData(user, group)
} else if (role === "Куратор") {
	getTutorData(user, group)
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