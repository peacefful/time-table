<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { DIRECTORS_API } from '@/API/apiEnterprisesInstitutions'
import { ref } from 'vue'
import { isEmptyLogin } from '@/utils/isEmptyLogin'
import { getDatas } from '@/utils/findItem'
import { getDirector } from '@/API/student'
import { getInstitutionData } from '@/API/director'
import Header from '@/components/UI/Header.vue'
import Title from '@/components/UI/TitlePage.vue'
import router from '@/router'
import type { IInstitutions } from '@/interfaces/iInstitution'

interface IDirector {
	id: number
	name: string
	surname: string
}

const institutionData = ref<IInstitutions>()
const directorData = ref<object>()
const appellation = ref<string | null>(localStorage.getItem('appellation'))
const role = localStorage.getItem('role')

if (role === 'Директор') {
  getDatas(DIRECTORS_API, directorData, 'id', Number(localStorage.getItem('id')))
  getInstitutionData(institutionData)
} else if (role === 'Студент') {
  getDirector(directorData, appellation)
} else if (role === 'Куратор') {
  getDirector(directorData, appellation)
}

const { animationBoolean } = move(500)
</script>
<template>
  <Header />
  <transition>
    <main v-if="animationBoolean">
      <div class="line"></div>
      <div v-if="isEmptyLogin()">
        <div v-if="role === 'Студент'">
          <Title :title="appellation" />
          <div style="margin-top: 2%">
            <h3>Директор</h3>
            <p style="margin-top: 0.5%">{{ directorData.name }} {{ directorData.surname }}</p>
          </div>
        </div>
        <div v-else-if="role === 'Директор'">
          <div v-if="institutionData">
            <Title :title="institutionData.appellation" />
            <div style="margin-top: 2%">
              <h3>Директор</h3>
              <div v-for="director in directorData" :key="director.id">
                <p style="margin-top: 0.5%">{{ director.name }} {{ director.surname }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div style="margin-top: 2%">
              Учреждения пока нету,
              <span
                @click="
                  router.push({ name: 'newinstitution', params: { form: 'add-institution' } })
                "
              >
                добавьте новое
              </span>
            </div>
          </div>
        </div>
        <div v-if="role === 'Куратор'">
          <Title :title="appellation" />
          <div style="margin-top: 2%">
            <h3>Директор</h3>
            <p style="margin-top: 0.5%">{{ directorData.name }} {{ directorData.surname }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <h2 style="margin-top: 2%; text-align: center" @click="router.push('/')">Войдите</h2>
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
    &:hover {
      color: rgba(255, 255, 255, 0.812);
    }
  }
}

button {
  padding: 0.5% 3%;
  margin-top: 1%;
}
</style>
../components/modal/openCloseDataModal@/utils/isEmptyLogin@/API/director
@/API/apiEnterprisesInstitutions