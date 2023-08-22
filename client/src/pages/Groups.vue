<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { ref } from 'vue';
import { isEmptyLogin } from '@/utils/isEmptyLogin';
import { groups } from '@/API/api-enterprises-institutions';
import router from "@/router";
import Header from '@/components/Header.vue';
import Title from "@/components/TitlePage.vue";
import axios from 'axios';

const groupsDatas = ref<object[]>([])
const institutionId:number = Number(localStorage.getItem('institutionId'))
const id = ref<number|null>(Number(localStorage.getItem('id')))
const role = localStorage.getItem('role')

if (role === "Директор") {
	async function getStudenst() {
		const data:object[] = (await axios.get(groups)).data
		groupsDatas.value = data.filter(item => item.institutionId === institutionId)
	}

	getStudenst()
} else if (role === "Студент") {
	async function getGroup() {
		const data:object[] = (await axios.get(groups)).data
		groupsDatas.value = data.find(item => {
			const students:object[] = item.students
			return students.find(student => student.id === id.value)
		})
	}
	getGroup()
}

const { animationBoolean } = move(500)
</script>

<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="isEmptyLogin()">
				<div v-if="role === 'Студент'">
					<Title :title="groupsDatas.groupName"/>
					<p 
						style="margin-top: 1%;"
						v-for="student in groupsDatas.students" 
						:key="student.id"
					>
						{{ student.name }} {{ student.surname }}
					</p>
				</div>
				<div v-if="role === 'Директор'">
					<Title title="Все группы"/>
					<div v-if="groupsDatas.length">
						<p
							style="padding-top: 1%;"
							@click="router.push({ name: 'newgroup', params: { form: 'add-group' }})"
						>
							Создать группу
						</p>
						<div style="margin-top: 4%;">
							<div style="margin-top: 1%;" v-for="group in groupsDatas" :key="group.id">
								<p>{{ group.groupName }}</p>
							</div>
						</div>
					</div>
					<div v-else style="margin-top: 1%;">
						Групп пока нету, <span @click="router.push({ name: 'newgroup', params: { form: 'add-group' }})">добавьте новую</span>
					</div>
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