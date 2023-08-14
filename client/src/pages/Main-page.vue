<script setup lang="ts">
import { move } from "@/hooks/useAnimation";
import { useCrud } from "@/stores/crud";
import { directors, institutions } from "@/API/api-enterprises-institutions";
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Title from "@/components/Title.vue";
import axios from "axios";
import router from "@/router";


const institutionsDatas = ref<object[]>([])
const directorsDatas = ref<object>()
const { getDatasFromApi } = useCrud()

getDatasFromApi(institutions, institutionsDatas)

async function getDirectors() {
	try {
		const directorsArr = (await axios.get(directors)).data
		directorsDatas.value = await directorsArr.find(item => item.institution.appellation === "КВПТК")
	} catch (error) {
		console.log(error);
	}
}

getDirectors()

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div v-if="institutionsDatas.length">
				<div v-for="institution in institutionsDatas" :key="institution.id">
					<Title :title="institution.appellation"/>
					<p> {{ directorsDatas.name }} {{ directorsDatas.surname }} </p>
				</div>
			</div>
			<div v-else>
				<div class="line"></div>
				<div style="margin-top: 2%;" >
					Учреждения пока нету,
					<span @click="router.push({ name: 'newinstitution', params: { form: 'add-institution' }})">
						добавьте новое
					</span>
				</div>
			</div>
		</main>
	</transition>
</template>

<style scoped lang="scss">
h3 {
	display: flex;
	justify-content: center;
}

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