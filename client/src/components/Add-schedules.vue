<script setup lang="ts">
import { tutors } from '@/API/api-enterprises-institutions';
import { ref, reactive, watch } from 'vue';
import axios from 'axios';

const tutorsData = ref<object[]>([])

async function getTutorsData() {
	const data:object[] = (await axios.get(tutors)).data
	tutorsData.value = data.filter(item => item.userId ===  Number(localStorage.getItem('institutionId')))
}

getTutorsData()

interface ICouple {
	subject: string
	room: string
	tutor: string
	begin: string
	end: string
}

const couple:ICouple = reactive({
	subject: "",
	room: "",
	tutor: "",
	begin: "",
	end: ""
})

const couples = ref<object[]>([couple])

function addCouple() {
	return couples.value.push(reactive({
		subject: "",
		room: "",
		tutor: "",
		begin: "",
		end: ""
	}))
}

function deleteCouple (index:number) {
	return couples.value.splice(index, 1)
}

</script>

<template>
	<main style="margin-top: 2%;" class="main">
		<div class="main__schedule">
			<h1>Новое расписание</h1>
			<form 
				class="main__schedule-form" 
				v-for="(couple, index) in couples" 
				:key="couple"
			>
				<div class="main__schedule-input-text">
					<input v-model="couple.subject" type="text" placeholder="Предмет">
					<input v-model="couple.room" type="text" placeholder="Кабинет">
					<select v-model="couple.tutor">
						<option disabled value="">Преподаватель</option>
						<option v-for="tutor in tutorsData" :key="tutor.id">
							{{ tutor.name }} {{ tutor.surname }}
						</option>
					</select>
				</div>
				<div class="main__schedule-input-time">
					<p>Начало</p>
					<input
						v-model="couple.begin"
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
				<button class="remove-couple" @click.prevent="deleteCouple(index)">Удалить</button>
			</form>
			<div>
				<button @click="addCouple()" class="add-couple">Добавить пару</button>
			</div>
			<button type="submit" style="margin-top: 1%;">Сохранить</button>
		</div>
	</main>
</template>

<style scoped lang="scss">
@import "../scss/mixins";

.remove-couple {
	@include button(red, white);
	margin-left: 1%;
	padding: 0.5%;
}
.add-couple {
	@include button(rgb(64, 255, 0), white);
	margin-top: 2%;
}

input[type='text'] {
	padding: 0.5%;
	margin: 0;
	border: 0;
	max-width: 300px;
}

select {
	margin-top: 1%;
	padding: 0.5%;
}

input[type='number'] {
	text-align: center;
	margin: 0;
	border: 0;
	padding: 0.5%;
	max-width: 100px;
}
.main {
	.main__schedule {
		.main__schedule-form {
			display: flex;
			align-items: center;
			.main__schedule-input-text {
				max-width: 1000px;
				width: 1000px;
				justify-content: space-between;
				display: flex;
				input {
					margin-top: 1%;
				}
			}
			.main__schedule-input-time{
				width: 500px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 2%;
			}
		}
	}
}


@media screen and (max-width: 1385px) {
	.main {
	.main__schedule {
		text-align: center;
	}
	.main__schedule-form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		.main__schedule-input-text {
			display: flex;
			flex-direction: column;
			align-items: center;
			input {
				margin-top: 1%;
			}
		}
		.main__schedule-input-time{
			margin-top: 2%;
			width: 500px;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 2%;
		}
	}
}
}
</style>