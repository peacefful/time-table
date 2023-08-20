<script setup lang="ts">
import { groups, timetables, tutors } from '@/API/api-enterprises-institutions';
import { ref, reactive } from 'vue';
import axios from 'axios';
import MondayTable from './weekdays/MondayTable.vue';
import TuesdayTable from './weekdays/TuesdayTable.vue';
import { monday, tuesday, wednesday, thursday, friday, saturday } from '@/API/api-weekday';

const tutorsData = ref<object[]>([])

async function getTutorsData() {
	const data:object[] = (await axios.get(tutors)).data
	tutorsData.value = data.filter(item => item.userId === Number(localStorage.getItem('institutionId')))
}

getTutorsData()

const groupsData = ref<object[]>([])

async function getGroups() {
	const data:object[] = (await axios.get(groups)).data
	groupsData.value = data.filter(item => item.institutionId === Number(localStorage.getItem('institutionId')))
}

getGroups()


const couplesMonday = ref<object[]>([])
const couplesTuesday = ref<object[]>([])
const couplesWednesday = ref<object[]>([])
const couplesThursday = ref<object[]>([])
const couplesFriday = ref<object[]>([])
const couplesSaturday = ref<object[]>([])

function addCouple(couples:object[]) {
	return couples.push(reactive({
		subject: "",
		room: "",
		tutor: "",
		begin: "",
		end: ""
	}))
}

const groupId = ref<string>('')

async function createSchedulesTable() {
	await axios.post(timetables, {
		groupId: groupId.value
	}).then(async res => {
		couplesMonday.value.forEach(async couple => {
			await axios.post(monday, {
				subject: couple.subject,
				office: couple.room,
				teacher: couple.tutor,
				beginning: couple.begin,
				end: couple.end,
				timeTableId: res.data.id
			})
		})
		couplesTuesday.value.forEach(async couple => {
			await axios.post(tuesday, {
				subject: couple.subject,
				office: couple.room,
				teacher: couple.tutor,
				beginning: couple.begin,
				end: couple.end,
				timeTableId: res.data.id
			})
		})
	})
}



</script>

<template>
	<main style="margin-top: 2%;" class="main">
		<form @submit="createSchedulesTable()">
			<div class="main__schedule">
			<h1>Новое расписание</h1>
			<MondayTable
				style="margin-top: 2%;"
				:couples-monday="couplesMonday"
				@add="addCouple(couplesMonday)"
				:tutors-data="tutorsData"
				:get-tutors-data="getTutorsData"
			/>
			<TuesdayTable
				:couples-tuesday="couplesTuesday"
				@add="addCouple(couplesTuesday)"
				:tutors-data="tutorsData"
				:get-tutors-data="getTutorsData"
			/>
			{{ couplesMonday }}
			{{ couplesTuesday }}
			<div>
				<select v-model="groupId">
					<option disabled value="">Выберите группу</option>
					<option v-for="group in groupsData" :key="group.id" :value="group.id">
						{{ group.groupName }}
					</option>
				</select>
			</div>
			{{ groupId }}
			<button type="submit" style="margin-top: 1%;">Сохранить</button>
		</div>
		</form>
	</main>
</template>