<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { ref } from 'vue';
import { groups } from '@/API/api-enterprises-institutions';
import router from "@/router";
import Header from '@/components/Header.vue';
import Title from "@/components/Title.vue";
import axios from 'axios';

const groupsDatas = ref<object[]>([])

async function getStudenst() {
	const data:object[] = (await axios.get(groups)).data
	groupsDatas.value = data.filter(item => item.groupName !== "Учащиеся")
}

getStudenst()

const { animationBoolean } = move(500)
</script>

<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<Title title="Группы"/>
			<p 
				style="padding-top: 1%;"
				@click="router.push({ name: 'newgroup', params: { form: 'add-group' }})"
			>
				Новая группа
			</p>
			<div v-if="groupsDatas.length">
				<div style="margin-top: 2%;" v-for="group in groupsDatas" :key="group.id">
					<p>{{ group.groupName }}</p>
				</div>
			</div>
			<div v-else style="margin-top: 1%;">
				Групп пока нету, <span @click="router.push({ name: 'newgroup', params: { form: 'add-group' }})">добавьте новую</span>
			</div>
		</main>
	</transition>
</template>