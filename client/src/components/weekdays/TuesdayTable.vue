<script setup lang="ts">
import { removeCouple } from "@/utils/removeCouple";

defineProps<{
	couplesTuesday: object[]
	getTutorsData: Function
	tutorsData: object[]
}>()

defineEmits(['add', 'getTutorsData'])

</script>

<template>
	<main>
		<div style="color: rgba(240, 248, 255, 0.613); margin-top: 1%;">Вторник</div>
			<div 
				class="main__schedule-form" 
				v-for="(couple, index) in couplesTuesday" 
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
			<button class="remove-couple" @click.prevent="removeCouple(index, couplesTuesday)">Удалить</button>
		</div>
		<div>
			<button @click.prevent="$emit('add')" class="add-couple">Добавить пару</button>
		</div>
	</main>
</template>