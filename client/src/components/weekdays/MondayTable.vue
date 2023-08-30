<script setup lang="ts">
import { removeCouple } from "@/utils/deleteCouple";

defineProps<{
	couplesMonday: object[]
	getTutorsData: Function
	tutorsData: object[]
}>()

defineEmits(['add', 'getTutorsData'])

const getInputId = (id:number) => {
	console.log(id);
}

</script>

<template>
	<main>
		<div style="color: rgba(240, 248, 255, 0.613);">
			<h3>Понедельник</h3>
		</div>
		<div 
				class="main__schedule-form" 
				v-for="(couple, index) in couplesMonday" 
				:key="couple.id"
			>
				<div class="main__schedule-input-text">
				<input
					@click="getInputId(couple.id)"
					v-model="couple.subject" 
					type="text" 
					placeholder="Предмет"
				>
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
				>
				<p>Конец</p>
				<input 
					v-model="couple.end"
					type="time" 
					placeholder="13"
				>
			</div>
			<button class="remove-couple" @click.prevent="removeCouple(index, couplesMonday)">Удалить</button>
		</div>
		<div>
			<button @click.prevent="$emit('add')" class="add-couple">Добавить пару</button>
		</div>
	</main>
</template>@/utils/deleteCouple@/utils/crud/deleteCouple@/utils/deleteCouple