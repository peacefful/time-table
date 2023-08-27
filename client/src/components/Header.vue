<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { directors, students, tutors } from "@/API/api-enterprises-institutions";
import { ref } from "vue";
import { isEmptyLogin } from '@/utils/isEmptyLogin';
import router from '@/router';
import axios from "axios";

const role = localStorage.getItem("role")

interface IPages {
	groups: {
		nameNav: string
		url: string
	},
	students?: {
		nameNav: string
		url: string
	},
	schedule: {
		nameNav: string
		url: string
	},
	main: {
		nameNav: string
		url: string
	}
}

const pages:IPages = {
	main: {
		nameNav: "Главная",
		url: '/main'
	},
	groups: {
		nameNav: "Группы",
		url: '/groups'
	},
	students: {
		nameNav: "Студенты",
		url: '/students'
	},
	schedule: {
		nameNav: "Расписание",
		url: '/schedule'
	},
}

const authUser = ref<object>({})

async function getAuthUser () {
	if (role === 'Студент') {
		const users = (await axios.get(students)).data
		authUser.value = await users.find(user => user.id === Number(localStorage.getItem("id")))
	} else if (role === 'Директор') {
		const users = (await axios.get(directors)).data
		authUser.value = await users.find(user => user.id === Number(localStorage.getItem("id")))
	} else if (role === 'Куратор') {
		const users = (await axios.get(tutors)).data
		authUser.value = await users.find(user => user.id === Number(localStorage.getItem("id")))
	}
}

getAuthUser()

console.log(localStorage.getItem("role"));
console.log(localStorage.getItem("id"));

const { animationBoolean } = move(400)
</script>

<template>
	<transition>
		<header v-if="animationBoolean">
			<div v-if="isEmptyLogin() === false && role === 'Студент'" class="header">
				<div class="header__nav">
					<ul v-for="(page, index) in pages" :key="index">
						<nav style="pointer-events: none;">
							<div class="header__nav-line"></div>
							<p @click="router.push(page.url)">{{ page.nameNav }}</p>
						</nav>
					</ul>
				</div>
				<h3 v-if="authUser">
					<p @click="router.push('/profile')">{{ authUser.name }}</p>
				</h3>
				<h3 v-else>
					<p>Гость</p>
				</h3>
			</div>
			<div v-else class="header">
				<div class="header__nav">
					<ul v-for="(page, index) in pages" :key="index">
						<nav>
							<div class="header__nav-line"></div>
							<p @click="router.push(page.url)">{{ page.nameNav }}</p>
						</nav>
					</ul>
				</div>
				<h3 v-if="authUser">
					<p @click="router.push('/profile')">{{ authUser.name }}</p>
				</h3>
				<h3 v-else>
					<p>Гость</p>
				</h3>
			</div>
		</header>
	</transition>
</template>

<style scoped lang="scss">
.header {
	border-radius: 15px;
	margin-top: 1%;
	padding: 1%;
	display: flex;
	justify-content: space-between;
	
	.header__nav {
		.header__nav-line{
			width: auto;
			height: 0.5px;
			background-color: rgba(255, 255, 255, 0.36);
		}
		font-size: 25px;
		width: 600px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>