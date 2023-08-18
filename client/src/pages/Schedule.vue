<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { ref } from 'vue';
import { timetables } from "@/API/api-enterprises-institutions"
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import axios from 'axios';

const schedulesData = ref<object[]>([])

async function getSchedules() {
	schedulesData.value = (await axios.get(timetables)).data
}

getSchedules()

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<Title title="Расписание" />
			<div v-if="schedulesData.length">

			</div>
			<div v-else style="margin-top: 1%;">
				Расписаний пока нету, добавьте новое
			</div>
		</main>
	</transition>
</template>