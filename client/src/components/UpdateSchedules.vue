<script setup lang="ts">
import { move } from "../hooks/useAnimation"
import { groups, tutors } from "@/API/api-enterprises-institutions";
import { ref, reactive } from "vue";
import { friday, monday, saturday, thursday, tuesday, wednesday } from "@/API/api-weekday";
import { getDatas } from "@/utils/findItem";
import axios from "axios";
import CoupleTable from "./CoupleTable.vue";

const tutorsData = ref<object[]>([])
const couples = reactive({
	mondayCouple: [],
	tuesdayCouple: [],
	wednesdayCouple: [],
	thursdayCouple: [],
	fridayCouple: [],
	saturdayCouple: [],
})

const scheduleId = localStorage.getItem("scheduleId")
const institutionId = localStorage.getItem("institutionId")

async function getCouples() {
	const data:object[] = (await axios.get(groups)).data
	const ownGroup = data.find(item => item.id === Number(scheduleId))
	couples.mondayCouple = ownGroup.monday
	couples.tuesdayCouple = ownGroup.tuesday
	couples.wednesdayCouple = ownGroup.wednesday
	couples.thursdayCouple = ownGroup.thursday
	couples.fridayCouple = ownGroup.friday
	couples.saturdayCouple = ownGroup.saturday
}

getCouples()

getDatas(tutors, tutorsData, "userId", Number(institutionId))

function updateSchedules () {
	const couplesWeeek:object[] = [
		{ api: monday, couple: couples.mondayCouple },
		{ api: tuesday, couple: couples.tuesdayCouple },
		{ api: wednesday, couple: couples.wednesdayCouple },
		{ api: thursday, couple: couples.thursdayCouple },
		{ api: friday, couple: couples.fridayCouple },
		{ api: saturday, couple: couples.saturdayCouple },
	]

	for (const iterator of couplesWeeek) {
		for (const couple of iterator.couple) {
			const putUrl = `${iterator.api}/${couple.id}`

			axios.put(putUrl, {
				subject: couple.subject,
				office: couple.office,
				teacher: couple.teacher,
				beginning: couple.beginning,
				end: couple.end,
				groupId: couple.groupId,
			})
		}
	}
}

const { animationBoolean } = move(300)
</script>

<template>
	<transition>
		<main v-if="animationBoolean" style="margin-top: 2%;" class="main">
			<form @submit.prevent="updateSchedules()">
				<div class="main__schedule">
					<h1>Изменить расписание</h1>
					<CoupleTable
						:couples="couples.mondayCouple"
						:tutors-data="tutorsData"
						:title="'Понедельник'"
					/>
					<CoupleTable
						:couples="couples.tuesdayCouple"
						:tutors-data="tutorsData"
						:title="'Вторник'"
					/>
					<CoupleTable
						:couples="couples.wednesdayCouple"
						:tutors-data="tutorsData"
						:title="'Среда'"
					/>
					<CoupleTable
						:couples="couples.thursdayCouple"
						:tutors-data="tutorsData"
						:title="'Четврерг'"
					/>
					<CoupleTable
						:couples="couples.fridayCouple"
						:tutors-data="tutorsData"
						:title="'Пятница'"
					/>
					<CoupleTable
						:couples="couples.saturdayCouple"
						:tutors-data="tutorsData"
						:title="'Суббота'"
					/>
					<button type="submit" style="margin-top: 1%;">Сохранить</button>
				</div>
			</form>
		</main>
	</transition>
</template>../interfaces/iIdsObject