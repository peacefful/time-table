<script setup lang="ts">
import { groups } from '@/API/api-enterprises-institutions';
import { reactive, ref } from 'vue';
import { getSchedulesTable } from '@/utils/getSchedulesTable';
import GetCoupleTable from '@/components/GetCoupleTable.vue';
import Title from '../components/UI/TitlePage.vue';
import router from '@/router';
import axios from 'axios';

const scheduleId = localStorage.getItem("scheduleId")

const couples = reactive({
	groupTtile: '',
	mondayCouple: [],
	tuesdayCouple: [],
	wednesdayCouple: [],
	thursdayCouple: [],
	fridayCouple: [],
	saturdayCouple: [],
})

async function getCouples() {
	const data:object[] = (await axios.get(groups)).data
	const ownGroup = data.find(item => item.id === Number(scheduleId))
	couples.groupTtile = ownGroup.groupName
	couples.mondayCouple = ownGroup.monday
	couples.tuesdayCouple = ownGroup.tuesday
	couples.wednesdayCouple = ownGroup.wednesday
	couples.thursdayCouple = ownGroup.thursday
	couples.fridayCouple = ownGroup.friday
	couples.saturdayCouple = ownGroup.saturday
}

getCouples()

function deleteSchedules() {
	const couplesWeeek = getSchedulesTable(
		couples.mondayCouple,
		couples.tuesdayCouple,
		couples.wednesdayCouple,
		couples.thursdayCouple,
		couples.fridayCouple,
		couples.saturdayCouple,
	)

	for (const couples of couplesWeeek) {
		for (const coup of couples.object) {
			const deleteUrl = `${couples.api}/${coup.id}`
			axios.delete(deleteUrl)
		}
	}
}

const isShowModal = ref<boolean>(true)
</script>

<template>
	<main v-if="isShowModal">
		<Title :title="couples.groupTtile" />
		<div v-if="couples.mondayCouple.length">
			<div style="color: rgba(255, 255, 255, 0.763);" class="schedules-flex">
				<GetCoupleTable
					title="Понедельник"
					:couples="couples.mondayCouple"
				/>
				<GetCoupleTable
					title="Вторник"
					:couples="couples.tuesdayCouple"
				/>
				<GetCoupleTable
					title="Среда"
					:couples="couples.wednesdayCouple"
				/>
				<GetCoupleTable
					title="Четверг"
					:couples="couples.thursdayCouple"
				/>
				<GetCoupleTable
					title="Пятница"
					:couples="couples.fridayCouple"
				/>
				<GetCoupleTable
					title="Суббота"
					:couples="couples.saturdayCouple"
				/>
			</div>
			<button 
				@click="router.push({ name: 'updateschedule', params: { form: 'update' }})"
				class="schedules-update">
					Изменить
				</button>
			<button class="schedules-remove" @click="deleteSchedules()">Удалить</button>
		</div>
		<div v-else style="margin-top: 1%;">
			Расписания пока нету
		</div>
	</main>
</template>

<style>

h2{
	text-align: center;
}

.week {
	margin-top: 7%;
}
</style>