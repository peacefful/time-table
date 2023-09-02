<script setup lang="ts">
import { move } from "../hooks/useAnimation"
import { groups, tutors } from "@/API/api-enterprises-institutions";
import { ref, reactive } from "vue";
import { useSaveId } from "@/stores/saveId";
import { removeCouple } from "@/utils/deleteCouple";
import { friday, monday, saturday, thursday, tuesday, wednesday } from "@/API/api-weekday";
import { getData, getDatas } from "@/utils/findItem";
import { type IIdsObject } from "../interfaces/iIdsObject"

const tutorsData = ref<object[]>([])
const couplesArr = ref<object[]|unknown>([])

const scheduleId = localStorage.getItem("scheduleId")
const institutionId = localStorage.getItem("institutionId")

getData(groups, couplesArr, "id", Number(scheduleId))
getDatas(tutors, tutorsData, "userId", Number(institutionId))

const { getUniqueIds } = useSaveId()

const mondayIds = ref<IIdsObject>({
	api: monday,
	ids: []
});

const tuesdayIds = ref<IIdsObject>({
	api: tuesday,
	ids: []
});

const wednesdayIds = ref<IIdsObject>({
	api: wednesday,
	ids: []
});

const thursdayIds = ref<IIdsObject>({
	api: thursday,
	ids: []
});

const fridayIds = ref<IIdsObject>({
	api: friday,
	ids: []
});

const saturdayIds = ref<IIdsObject>({
	api: saturday,
	ids: []
});

const schedule = reactive({
	subject: "",
	office: "",
	teacher: "",
	beginning: "",
	end: ""
})

function updateSchedules () {
	const putIds = [mondayIds.value, tuesdayIds.value, wednesdayIds.value, thursdayIds.value, fridayIds.value, saturdayIds.value]

	for (const iterator of putIds) {
		for (const id of iterator.ids) {
			const putUrl = `${iterator.api}/${id}`
			console.log(putUrl);
		}
	}
}

const fdh = ref<string>("")

function getScheduleData(data: string) {
	data = fdh.value
}

const { animationBoolean } = move(300)
</script>

<template>
	<transition>
		<main v-if="animationBoolean" style="margin-top: 2%;" class="main">
			<form @submit.prevent="updateSchedules()">
				<div class="main__schedule">
				<h1>Изменить расписание</h1>
				<div style="color: rgba(240, 248, 255, 0.613);">
					<h3>Понедельник</h3>
				</div>
					{{ mondayIds }}
					<div v-for="(couple, index) in couplesArr.monday" :key="couple.id">
						<div 
							@click="getUniqueIds(couple.id, mondayIds.ids)"
							class="main__schedule-form" 
						>
						<div class="main__schedule-input-text">
						<input
							type="text"
							v-model="couple.subject"
							placeholder="Предмет"
							@click="getScheduleData(couple.subject)"
						>
						<input
							v-model="couple.office"
							type="text"
							placeholder="Кабинет"
						>
							<select v-model="couple.teacher">
								<option disabled value="">Преподаватель</option>
								<option v-for="tutor in tutorsData" :key="tutor.id">
									{{ tutor.name }} {{ tutor.surname }}
								</option>
							</select>
						</div>
						<div class="main__schedule-input-time">
							<p>Начало</p>
							<input
								v-model="couple.beginning"
								type="time"
							>
							<p>Конец</p>
							<input 
								v-model="couple.end"
								type="time"
							>
						</div>
						<button class="remove-couple" @click.prevent="removeCouple(index, couplesArr.monday)">Удалить</button>
					</div>
				</div>
				<div style="color: rgba(240, 248, 255, 0.613); margin-top: 1%;">
					<h3>Вторник</h3>
				</div>
				{{ tuesdayIds }}
					<div 
						@click="getUniqueIds(couple.id, tuesdayIds.ids)"
						class="main__schedule-form" 
						v-for="(couple, index) in couplesArr.tuesday" 
						:key="couple.id"
					>
						<div class="main__schedule-input-text">
						<input v-model="couple.subject" type="text" placeholder="Предмет">
						<input v-model="couple.office" type="text" placeholder="Кабинет">
						<select v-model="couple.teacher">
							<option disabled value="">Преподаватель</option>
							<option v-for="tutor in tutorsData" :key="tutor.id">
								{{ tutor.name }} {{ tutor.surname }}
							</option>
						</select>
					</div>
					<div class="main__schedule-input-time">
						<p>Начало</p>
						<input
							v-model="couple.beginning"
							type="time" 
							placeholder="8"
							max="24"
							min="0"
						>
						<p>Конец</p>
						<input 
							v-model="couple.end"
							type="time" 
							placeholder="13"
							max="24"
							min="0"
						>
					</div>
					<button class="remove-couple" @click.prevent="removeCouple(index, couplesArr.tuesday)">Удалить</button>
				</div>
				<div style="color: rgba(240, 248, 255, 0.613); margin-top: 1%;">
					<h3>Среда</h3>
				</div>
				{{ wednesdayIds }}
					<div 
						@click="getUniqueIds(couple.id, wednesdayIds.ids)"
						class="main__schedule-form" 
						v-for="(couple, index) in couplesArr.wednesday" 
						:key="couple.id"
					>
						<div class="main__schedule-input-text">
						<input v-model="couple.subject" type="text" placeholder="Предмет">
						<input v-model="couple.office" type="text" placeholder="Кабинет">
						<select v-model="couple.teacher">
							<option disabled value="">Преподаватель</option>
							<option v-for="tutor in tutorsData" :key="tutor.id">
								{{ tutor.name }} {{ tutor.surname }}
							</option>
						</select>
					</div>
					<div class="main__schedule-input-time">
						<p>Начало</p>
						<input
							v-model="couple.beginning"
							type="time" 
							placeholder="8"
							max="24"
							min="0"
						>
						<p>Конец</p>
						<input 
							v-model="couple.end"
							type="time" 
							placeholder="13"
							max="24"
							min="0"
						>
					</div>
					<button class="remove-couple" @click.prevent="removeCouple(index, couplesArr.wednesday)">Удалить</button>
				</div>
				<div style="color: rgba(240, 248, 255, 0.613); margin-top: 1%;">
					<h3>Четверг</h3>
				</div>
				{{ thursdayIds }}
					<div 
						@click="getUniqueIds(couple.id, thursdayIds.ids)"
						class="main__schedule-form" 
						v-for="(couple, index) in couplesArr.thursday" 
						:key="couple.id"
					>
						<div class="main__schedule-input-text">
						<input v-model="couple.subject" type="text" placeholder="Предмет">
						<input v-model="couple.office" type="text" placeholder="Кабинет">
						<select v-model="couple.teacher">
							<option disabled value="">Преподаватель</option>
							<option v-for="tutor in tutorsData" :key="tutor.id">
								{{ tutor.name }} {{ tutor.surname }}
							</option>
						</select>
					</div>
					<div class="main__schedule-input-time">
						<p>Начало</p>
						<input
							v-model="couple.beginning"
							type="time" 
							placeholder="8"
							max="24"
							min="0"
						>
						<p>Конец</p>
						<input 
							v-model="couple.end"
							type="time" 
							placeholder="13"
							max="24"
							min="0"
						>
					</div>
					<button class="remove-couple" @click.prevent="removeCouple(index, couplesArr.thursday)">Удалить</button>
				</div>
				<div style="color: rgba(240, 248, 255, 0.613); margin-top: 1%;">
					<h3>Пятница</h3>
				</div>
				{{ fridayIds }}
					<div 
						@click="getUniqueIds(couple.id, fridayIds.ids)"
						class="main__schedule-form" 
						v-for="(couple, index) in couplesArr.friday" 
						:key="couple.id"
					>
						<div class="main__schedule-input-text">
						<input v-model="couple.subject" type="text" placeholder="Предмет">
						<input v-model="couple.office" type="text" placeholder="Кабинет">
						<select v-model="couple.teacher">
							<option disabled value="">Преподаватель</option>
							<option v-for="tutor in tutorsData" :key="tutor.id">
								{{ tutor.name }} {{ tutor.surname }}
							</option>
						</select>
					</div>
					<div class="main__schedule-input-time">
						<p>Начало</p>
						<input
							v-model="couple.beginning"
							type="time" 
							placeholder="8"
							max="24"
							min="0"
						>
						<p>Конец</p>
						<input 
							v-model="couple.end"
							type="time" 
							placeholder="13"
							max="24"
							min="0"
						>
					</div>
					<button class="remove-couple" @click.prevent="removeCouple(index, couplesArr.friday)">Удалить</button>
				</div>
				<div style="color: rgba(240, 248, 255, 0.613); margin-top: 1%;">
					<h3>Суббота</h3>
				</div>
				{{ saturdayIds }}
					<div 
						@click="getUniqueIds(couple.id, saturdayIds.ids)"
						class="main__schedule-form" 
						v-for="(couple, index) in couplesArr.saturday" 
						:key="couple.id"
					>
						<div class="main__schedule-input-text">
						<input v-model="couple.subject" type="text" placeholder="Предмет">
						<input v-model="couple.office" type="text" placeholder="Кабинет">
						<select v-model="couple.teacher">
							<option disabled value="">Преподаватель</option>
							<option v-for="tutor in tutorsData" :key="tutor.id">
								{{ tutor.name }} {{ tutor.surname }}
							</option>
						</select>
					</div>
					<div class="main__schedule-input-time">
						<p>Начало</p>
						<input
							v-model="couple.beginning"
							type="time" 
							placeholder="8"
							max="24"
							min="0"
						>
						<p>Конец</p>
						<input 
							v-model="couple.end"
							type="time" 
							placeholder="13"
							max="24"
							min="0"
						>
					</div>
					<button class="remove-couple" @click.prevent="removeCouple(index, couplesArr.saturday)">Удалить</button>
				</div>
				<button type="submit" style="margin-top: 1%;">Сохранить</button>
			</div>
			</form>
		</main>
	</transition>
</template>../interfaces/iIdsObject