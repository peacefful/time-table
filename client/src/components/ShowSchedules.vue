<script setup lang="ts">
import { groups } from '@/API/api-enterprises-institutions';
import { ref } from 'vue';
import { getData } from '@/utils/findItem';
import Title from './TitlePage.vue';
import router from '@/router';

const schedulesData = ref<object[]>([])
getData(groups, schedulesData, "id", Number(localStorage.getItem("scheduleId")))

const isShowModal = ref<boolean>(true)
</script>

<template>
	<main v-if="isShowModal">
		<div>
			<Title :title="schedulesData.groupName" />
			<div style="color: rgba(255, 255, 255, 0.763);" class="schedules-flex">
								<div>
									<h3>Понедельник</h3>
									<div v-for="monday in schedulesData.monday" :key="monday.id">
										{{ monday.subject }} ({{ monday.teacher }}) [{{ monday.office }}]
										[{{ monday.beginning }}-{{ monday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Вторник</h3>
									<div v-for="tuesday in schedulesData.tuesday" :key="tuesday.id">
										{{ tuesday.subject }} ({{ tuesday.teacher }}) [{{ tuesday.office }}]
										[{{ tuesday.beginning }}-{{ tuesday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Среда</h3>
									<div v-for="wednesday in schedulesData.wednesday" :key="wednesday.id">
										{{ wednesday.subject }} ({{ wednesday.teacher }}) [{{ wednesday.office }}]
										[{{ wednesday.beginning }}-{{ wednesday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Четверг</h3>
									<div v-for="thursday in schedulesData.thursday" :key="thursday.id">
										{{ thursday.subject }} ({{ thursday.teacher }}) [{{ thursday.office }}]
										[{{ thursday.beginning }}-{{ thursday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Пятница</h3>
									<div v-for="friday in schedulesData.friday" :key="friday.id">
										{{ friday.subject }} ({{ friday.teacher }}) [{{ friday.office }}]
										[{{ friday.beginning }}-{{ friday.end }}]
									</div>
								</div>
								<div style="margin-top: 1%;">
									<h3>Суббота</h3>
									<div v-for="saturday in schedulesData.saturday" :key="saturday.id">
										{{ saturday.subject }} ({{ saturday.teacher }}) [{{ saturday.office }}]
										[{{ saturday.beginning }}-{{ saturday.end }}]
									</div>
								</div>
							</div>
							<button 
								@click="router.push({ name: 'updateschedule', params: { form: 'update' }})"
								class="schedules-update">
								Изменить
							</button>
							<button class="schedules-remove">Удалить</button>
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