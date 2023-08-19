<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { ref } from 'vue';
import { timetables } from "@/API/api-enterprises-institutions"
import { isLogin } from '@/utils/isLogin';
import router from '@/router';
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
			<div class="line"></div>
			<div v-if="isLogin()">
				<Title title="Расписание" />
				<div v-if="schedulesData.length">
				</div>
				<div v-else style="margin-top: 1%;">
					Расписаний пока нету, 
					<span @click="router.push({ name:'newschedule', params:{form: 'add-schedules'} })">
						добавьте новое
					</span>
				</div>
			</div>
			<div v-else>
				<p style="margin-top: 2%; text-align: center;">
					<h2 @click="router.push('/')">
						Войдите
					</h2>
				</p>
			</div>
		</main>
	</transition>
</template>