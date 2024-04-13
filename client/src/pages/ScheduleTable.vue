<!-- eslint-disable no-inner-declarations -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import { ref } from 'vue'
import { isEmptyLogin } from '@/utils/isEmptyLogin'
import { students, tutors } from '@/API/apiEnterprisesInstitutions'
import { getData } from '@/utils/findItem'
import { getStudentSchedules } from '@/API/student'
import { getGroups } from '@/API/director'
import { useTutorStore } from '@/API/tutor'
import GetCoupleTable from '@/components/GetCoupleTable.vue'
import router from '@/router'
import Header from '@/components/UI/Header.vue'
import Title from '@/components/UI/TitlePage.vue'

const role = localStorage.getItem('role')

const schedulesData = ref<object[]>([])
const groupsHasSchedules = ref<object[]>([])
const student = ref<object[]>([])
const tutor = ref<object[]>([])

const { getTutorSchedules } = useTutorStore()

if (role === 'Студент') {
  getData(students, student, 'id', Number(localStorage.getItem('id')))
  getStudentSchedules(schedulesData)
} else if (role === 'Директор') {
  getGroups(groupsHasSchedules)
} else if (role === 'Куратор') {
  getData(tutors, tutor, 'id', Number(localStorage.getItem('id')))
  getTutorSchedules(schedulesData)
}

const getIdGroup = (id: number) => {
  localStorage.setItem('addUserGroupId', id.toString())
  router.push({ name: 'showschedule', params: { form: 'schedules' } })
}

const { animationBoolean } = move(500)
</script>
<template>
  <Header />
  <transition>
    <main v-if="animationBoolean">
      <div class="line"></div>
      <div v-if="isEmptyLogin()">
        <div v-if="role === 'Студент' || role === 'Куратор'">
          <div style="margin-top: 2%" v-if="student.groupId === null || tutor.groupId === null">
            Вы не состоите в группе
          </div>
          <div v-else>
            <Title title="Расписание" />
            <div v-if="schedulesData.monday">
              <div style="color: rgba(255, 255, 255, 0.763)" class="schedules-flex">
                <GetCoupleTable title="Понедельник" :couples="schedulesData.monday" />
                <GetCoupleTable title="Вторник" :couples="schedulesData.tuesday" />
                <GetCoupleTable title="Среда" :couples="schedulesData.wednesday" />
                <GetCoupleTable title="Четверг" :couples="schedulesData.thursday" />
                <GetCoupleTable title="Пятница" :couples="schedulesData.friday" />
                <GetCoupleTable title="Суббота" :couples="schedulesData.saturday" />
              </div>
            </div>
            <div v-else style="margin-top: 1%">Расписаний для вашей группе пока нету.</div>
          </div>
        </div>
        <div v-else-if="role === 'Директор'">
          <Title title="Расписание" />
          <div style="margin-top: 1%">
            <div v-if="groupsHasSchedules.length">
              <p @click="router.push({ name: 'newschedule', params: { form: 'create' } })">
                Добавить расписание
              </p>
              <div style="margin-top: 2%" v-for="group in groupsHasSchedules" :key="group.id">
                <p @click="getIdGroup(group.id)">{{ group.groupName }}</p>
              </div>
            </div>
            <div v-else>
              Расписаний пока нету,
              <span @click="router.push({ name: 'newschedule', params: { form: 'create' } })">
                добавьте новое
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h2 style="margin-top: 2%; text-align: center" @click="router.push('/')">Войдите</h2>
      </div>
    </main>
  </transition>
</template>
@/API/director
@/API/apiEnterprisesInstitutions