<script setup lang="ts">
import { groups, tutors } from '@/API/api-enterprises-institutions';
import { ref, reactive, watch } from 'vue';
import { monday, tuesday, wednesday, thursday, friday, saturday } from '@/API/api-weekday';
import axios from 'axios';
import MondayTable from './weekdays/MondayTable.vue';
import TuesdayTable from './weekdays/TuesdayTable.vue';
import WednesdayTable from './weekdays/WednesdayTable.vue';
import ThursdayTable from './weekdays/ThursdayTable.vue';
import FridayTable from './weekdays/FridayTable.vue';
import SaturdayTable from './weekdays/SaturdayTable.vue';

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

// const example = reactive({
// 	subject: "",
// 	office: "",
// 	teacher: "",
// 	beginning: "",
// 	end: "",
// 	groupId: null
// })

const couplesMonday = ref<object[]>([])
const couplesTuesday = ref<object[]>([])
const couplesWednesday = ref<object[]>([])
const couplesThursday = ref<object[]>([])
const couplesFriday = ref<object[]>([])
const couplesSaturday = ref<object[]>([])

function addCouple(couples:object[]) {
	return couples.push(reactive({
		subject: "",
		office: "",
		teacher: "",
		beginning: "",
		end: "",
		groupId: null
	}))
}

const groupId = ref<number>()

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
			setTimeout(() => {
				location.reload()
			}, 100);
		}
	}
}
</script>

<template>
	<main style="margin-top: 2%;" class="main">
		<form @submit.prevent="createSchedulesTable()">
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
			<WednesdayTable
				:couples-wednesday="couplesWednesday"
				@add="addCouple(couplesWednesday)"
				:tutors-data="tutorsData"
				:get-tutors-data="getTutorsData"
			/>
			<ThursdayTable
				:couples-thursday="couplesThursday"
				@add="addCouple(couplesThursday)"
				:tutors-data="tutorsData"
				:get-tutors-data="getTutorsData"
			/>
			<FridayTable
				:couples-friday="couplesFriday"
				@add="addCouple(couplesFriday)"
				:tutors-data="tutorsData"
				:get-tutors-data="getTutorsData"
			/>
			<SaturdayTable
				:couples-saturday="couplesSaturday"
				@add="addCouple(couplesSaturday)"
				:tutors-data="tutorsData"
				:get-tutors-data="getTutorsData"
			/>
			<div>
				<select v-model="groupId">
					<option disabled value="">Выберите группу</option>
					<option v-for="group in groupsData" :key="group.id" :value="group.id">
						{{ group.groupName }}
					</option>
				</select>
			</div>
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