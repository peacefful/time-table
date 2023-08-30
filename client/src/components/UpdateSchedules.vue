<script setup lang="ts">
import { move } from "../hooks/useAnimation"
import { groups, tutors } from "@/API/api-enterprises-institutions";
import { ref, reactive } from "vue";
import axios from "axios";
import MondayTable from "@/components/weekdays/MondayTable.vue"
import TuesdayTable from "@/components/weekdays/TuesdayTable.vue"
import WednesdayTable from "@/components/weekdays/WednesdayTable.vue"
import ThursdayTable from "@/components/weekdays/ThursdayTable.vue"
import FridayTable from "@/components/weekdays/FridayTable.vue"
import SaturdayTable from "@/components/weekdays/SaturdayTable.vue"

const groupId = ref<string>('')
const tutorsData = ref<object[]>([])

const couplesMonday = ref<object[]>([])
const couplesTuesday = ref<object[]>([])
const couplesWednesday = ref<object[]>([])
const couplesThursday = ref<object[]>([])
const couplesFriday = ref<object[]>([])
const couplesSaturday = ref<object[]>([])

const getSchedule = async () => {
	const data:object[] = (await axios.get(groups)).data
	const selectGroup:object = data.find(group => group.id === Number(localStorage.getItem("scheduleId")))
	couplesMonday.value = selectGroup.monday;
	couplesTuesday.value = selectGroup.tuesday;
	couplesWednesday.value = selectGroup.wednesday;
	couplesThursday.value = selectGroup.thursday;
	couplesFriday.value = selectGroup.friday;
	couplesSaturday.value = selectGroup.saturday;
}

getSchedule()

async function getTutorsData() {
	const data:object[] = (await axios.get(tutors)).data
	tutorsData.value = data.filter(item => item.userId === Number(localStorage.getItem("institutionId")))
}

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

getTutorsData()

const groupsData = ref<object[]>([])

async function getGroups() {
	const data:object[] = (await axios.get(groups)).data
	groupsData.value = data.filter(item => item.institutionId === Number(localStorage.getItem("institutionId")))
}

getGroups()

const { animationBoolean } = move(300)
</script>

<template>
	<transition>
		<main v-if="animationBoolean" style="margin-top: 2%;" class="main">
			<form >
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
	</transition>
</template>