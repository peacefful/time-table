<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { DIRECTORS_API, students, tutors } from '@/API/apiEnterprisesInstitutions'
import { ref } from 'vue'
import { isEmptyLogin } from '@/utils/isEmptyLogin'
import router from '@/router'
import axios from 'axios'
import type { IPages } from '@/interfaces/iPages'
import type { IUsers } from '@/interfaces/iUsers'

const role = localStorage.getItem('role')

const pages = ref<IPages[]>([
	{
		id: 1,
		nameNav: 'Главная',
		url: '/main'
	},
	{
		id: 2,
		nameNav: 'Группы',
		url: '/groups'
	},
	{
		id: 3,
		nameNav: 'Студенты',
		url: '/students'
	},
	{
		id: 4,
		nameNav: 'Расписание',
		url: '/schedule'
	}
])

const authUser = ref<IUsers>()

async function getAuthUser() {
  if (role === 'Студент') {
    const users = (await axios.get(students)).data
    authUser.value = await users.find(
      (user: { id: number }) => user.id === Number(localStorage.getItem('id'))
    )
  } else if (role === 'Директор') {
    const users = (await axios.get(DIRECTORS_API)).data
    authUser.value = await users.find(
      (user: { id: number }) => user.id === Number(localStorage.getItem('id'))
    )
  } else if (role === 'Куратор') {
    const users = (await axios.get(tutors)).data
    authUser.value = await users.find(
      (user: { id: number }) => user.id === Number(localStorage.getItem('id'))
    )
  }
}

getAuthUser()

const { animationBoolean } = move(400)
</script>

<template>
  <transition>
    <header v-if="animationBoolean">
      <div v-if="isEmptyLogin() === false && role === 'Студент'" class="header">
        <div class="header__nav">
          <ul v-for="page in pages" :key="page.id">
            <nav style="pointer-events: none">
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
        <nav class="header__nav">
          <ul v-for="page in pages" :key="page.id">
            <p @click="router.push(page.url)">{{ page.nameNav }}</p>
          </ul>
        </nav>
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
    font-size: 25px;
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
@/API/apiEnterprisesInstitutions