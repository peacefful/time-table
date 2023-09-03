<script setup lang="ts">
import { removeCouple } from "@/utils/deleteCouple";
import { ref } from "vue";
import { useRoute } from "vue-router";

defineProps<{
	couples: object[]
	tutorsData: object[]
	title:string
}>()

defineEmits(['add'])

const router = useRoute()
const isAddCouples = ref<boolean>(true)

if (router.path.includes("update")) {
	isAddCouples.value = false
}

</script>

<template>
	<main style="margin-top: 2%;">
		<div style="color: rgba(240, 248, 255, 0.613);">
			<h3>{{ title }}</h3>
		</div>
		<div
			class="main__schedule-form" 
			v-for="(couple, index) in couples" 
			:key="couple.id"
		>
			<div class="main__schedule-input-text">
			<input
				v-model="couple.subject" 
				type="text" 
				placeholder="Предмет"
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
					placeholder="8"
				>
				<p>Конец</p>
				<input 
					v-model="couple.end"
					type="time" 
					placeholder="13"
				>
			</div>
			<button class="remove-couple" @click.prevent="removeCouple(index, couples)">Удалить</button>
		</div>
		<div v-if="isAddCouples">
			<button @click.prevent="$emit('add')" class="add-couple">Добавить пару</button>
		</div>
	</main>
</template>