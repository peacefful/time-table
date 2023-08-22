<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { useCrud } from "@/stores/crud";
import { directors, institutions } from "@/API/api-enterprises-institutions";
import { ref } from "vue";
import { isLogin } from "@/utils/isLogin";
import Header from "@/components/Header.vue";
import Title from "@/components/Title.vue";
import router from "@/router";
import axios from "axios";

const institutionData = ref<object>()
const directorData = ref<object>()

const { getDatas } = useCrud()

getDatas(directors, directorData, Number(localStorage.getItem("id")), 'id')

async function getInstitutionData() {
	const result = (await axios.get(institutions)).data
	institutionData.value = result.find(item => item.directorId === Number(localStorage.getItem("id")))
	localStorage.setItem("institutionId", institutionData.value.id)
}
getInstitutionData()

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="isLogin()">
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
</style>../components/modal/openCloseDataModal