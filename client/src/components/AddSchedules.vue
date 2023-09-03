<script lang="ts" setup>
import { groups, tutors } from '@/API/api-enterprises-institutions';
import { ref, reactive } from 'vue';
import { monday, tuesday, wednesday, thursday, friday, saturday } from '@/API/api-weekday';
import axios from 'axios';
import CoupleTable from './CoupleTable.vue';

const tutorsData = ref<object[]>([])

async function getTutorsData() {
	const data:object[] = (await axios.get(tutors)).data
	tutorsData.value = data.filter(item => item.userId === Number(localStorage.getItem("institutionId")))
}

getTutorsData()

const groupsData = ref<object[]>([])

async function getGroups() {
	const data:object[] = (await axios.get(groups)).data
	groupsData.value = data.filter((item) => item.institutionId === Number(localStorage.getItem("institutionId")))
}

getGroups()

const couplesMonday = ref<object[]>([])
const couplesTuesday = ref<object[]>([])
const couplesWednesday = ref<object[]>([])
const couplesThursday = ref<object[]>([])
const couplesFriday = ref<object[]>([])
const couplesSaturday = ref<object[]>([])

function addCouple(couples:object[]) {
	couples.push(reactive({
		subject: "",
		office: "",
		teacher: "",
		beginning: "",
		end: "",
		groupId: null
	}))
}

const groupId = ref<string>('')

const couples:object[] = [
	{ object: couplesMonday.value, api: monday },
	{ object: couplesTuesday.value, api: tuesday },
	{ object: couplesWednesday.value, api: wednesday },
	{ object: couplesThursday.value, api: thursday },
	{ object: couplesFriday.value, api: friday },
	{ object: couplesSaturday.value, api: saturday },
]

async function createSchedulesTable() {
	for (const couple of couples) {
		for (const item of couple.object) {
			item.groupId = groupId.value;
			await axios.post(couple.api, item);

			item.subject = "";
			item.office = "";
			item.teacher = "";
			item.beginning = "";
			item.end = "";
		}
	}
}
</script>

<template>
	<main style="margin-top: 2%;" class="main">
		<form @submit.prevent="createSchedulesTable()">
			<div class="main__schedule">
			<h1>Новое расписание</h1>
			<CoupleTable
				:couples="couplesMonday"
				:tutors-data="tutorsData"
				:title="'Понедельник'"
				@add="addCouple(couplesMonday)"
			/>
			<CoupleTable
				:couples="couplesTuesday"
				:tutors-data="tutorsData"
				:title="'Вторник'"
				@add="addCouple(couplesMonday)"
			/>
			<CoupleTable
				:couples="couplesWednesday"
				:tutors-data="tutorsData"
				:title="'Среда'"
				@add="addCouple(couplesMonday)"
			/>
			<CoupleTable
				:couples="couplesThursday"
				:tutors-data="tutorsData"
				:title="'Четверг'"
				@add="addCouple(couplesMonday)"
			/>
			<CoupleTable
				:couples="couplesFriday"
				:tutors-data="tutorsData"
				:title="'Пятница'"
				@add="addCouple(couplesMonday)"
			/>
			<CoupleTable
				:couples="couplesSaturday"
				:tutors-data="tutorsData"
				:title="'Суббота'"
				@add="addCouple(couplesMonday)"
			/>
			<button type="submit" style="margin-top: 1%;">Сохранить</button>
		</div>
		</form>
	</main>
</template>

<style>
select {
	margin-top: 1%;
	padding: 0.5%;
}
</style>