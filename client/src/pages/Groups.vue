<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { ref } from 'vue';
import { isLogin } from '@/utils/isLogin';
import { groups } from '@/API/api-enterprises-institutions';
import router from "@/router";
import Header from '@/components/Header.vue';
import Title from "@/components/Title.vue";
import axios from 'axios';

const groupsDatas = ref<object[]>([])
const institutionId:number = Number(localStorage.getItem('institutionId'))

async function getStudenst() {
	const data:object[] = (await axios.get(groups)).data
	groupsDatas.value = data.filter(item => item.groupName !== "Учащиеся" && item.institutionId === institutionId)
}

getStudenst()

const { animationBoolean } = move(500)
</script>

<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="isLogin()">
				<Title title="Группы"/>
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