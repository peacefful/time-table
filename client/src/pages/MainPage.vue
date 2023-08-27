<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { useCrud } from "@/stores/crud";
import { directors, institutions } from "@/API/api-enterprises-institutions";
import { ref } from "vue";
import { isEmptyLogin } from "@/utils/isEmptyLogin";
import Header from "@/components/Header.vue";
import Title from "@/components/TitlePage.vue";
import router from "@/router";
import axios from "axios";

const institutionData = ref<object>()
const directorData = ref<object>()
const appellation = ref<string|null>(localStorage.getItem('appellation'))
const role = localStorage.getItem("role")

const { getDatas } = useCrud()

if (role === "Директор") {
	getDatas(directors, directorData, Number(localStorage.getItem("id")), 'id')

	async function getInstitutionData() {
		const result = (await axios.get(institutions)).data
		institutionData.value = result.find(item => item.directorId === Number(localStorage.getItem("id")))
		localStorage.setItem("institutionId", institutionData.value.id)
	}
	getInstitutionData()
} else if (role === "Студент") {
	async function getDirector() {
		const data:object[] = (await axios.get(directors)).data
		directorData.value = data.find(director => director.institution.appellation === appellation.value)
	}
	getDirector()
} else if (role === "Куратор") {
	async function getDirector() {
		const data:object[] = (await axios.get(directors)).data
		directorData.value = data.find(director => director.institution.appellation === appellation.value)
	}
	getDirector()
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
					<Title :title="appellation" />
					<div style="margin-top: 2%;">
						<h3>Директор</h3>
						<p style="margin-top: 0.5%;">{{ directorData.name }} {{ directorData.surname }}</p>
					</div>
				</div>
				<div v-else-if="role === 'Директор'">
					<div v-if="institutionData">
						<Title :title="institutionData.appellation" />
						<div style="margin-top: 2%;">
							<h3>Директор</h3>
							<div v-for="director in directorData" :key="director.id">
								<p style="margin-top: 0.5%;">{{ director.name }} {{ director.surname }}</p>
							</div>
						</div>
					</div>
					<div v-else>
						<div style="margin-top: 2%;" >
							Учреждения пока нету,
							<span @click="router.push({ name: 'newinstitution', params: { form: 'add-institution' }})">
								добавьте новое
							</span>
						</div>
					</div>
				</div>
				<div v-if="role === 'Куратор'">
					<Title :title="appellation" />
					<div style="margin-top: 2%;">
						<h3>Директор</h3>
						<p style="margin-top: 0.5%;">{{ directorData.name }} {{ directorData.surname }}</p>
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

<style scoped lang="scss">
ul {
	margin-top: 2%;
	li {
		cursor: pointer;
		list-style: none;
		&:hover{
			color: rgba(255, 255, 255, 0.812);
		}
	}
}

button {
	padding: 0.5% 3%;
	margin-top: 1%;
}
</style>../components/modal/openCloseDataModal@/utils/isEmptyLogin