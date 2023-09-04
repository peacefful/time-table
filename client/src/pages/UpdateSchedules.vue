<script setup lang="ts">
import { move } from '../hooks/useAnimation'
import {
  changeGroupStudents,
  changeGroupTutors,
  groups,
  students,
  tutors
} from '@/API/api-enterprises-institutions'
import { ref, reactive } from 'vue'
import { getDatas } from '@/utils/findItem'
import { getSchedulesTable } from '@/utils/getSchedulesTable'
import axios from 'axios'
import SelectStudentsTutors from '@/components/SelectStudentsTutors.vue'
import CoupleTable from '../components/EditCoupleTable.vue'

const tutorsData = ref<object[]>([])
const addUserGroupId = localStorage.getItem('addUserGroupId')
const institutionId = localStorage.getItem('institutionId')
const idsStudents = ref<string[]>([])
const idsTutors = ref<string[]>([])

const couples = reactive({
  mondayCouple: [],
  tuesdayCouple: [],
  wednesdayCouple: [],
  thursdayCouple: [],
  fridayCouple: [],
  saturdayCouple: []
})

async function getCouples() {
  const data: object[] = (await axios.get(groups)).data
  const ownGroup = data.find((item) => item.id === Number(addUserGroupId))
  couples.mondayCouple = ownGroup.monday
  couples.tuesdayCouple = ownGroup.tuesday
  couples.wednesdayCouple = ownGroup.wednesday
  couples.thursdayCouple = ownGroup.thursday
  couples.fridayCouple = ownGroup.friday
  couples.saturdayCouple = ownGroup.saturday
}

getCouples()

getDatas(tutors, tutorsData, 'userId', Number(institutionId))

function updateSchedules() {
  const couplesWeeek: object[] = getSchedulesTable(
    couples.mondayCouple,
    couples.tuesdayCouple,
    couples.wednesdayCouple,
    couples.thursdayCouple,
    couples.fridayCouple,
    couples.saturdayCouple
  )

  for (const iterator of couplesWeeek) {
    for (const couple of iterator.object) {
      const putUrl = `${iterator.api}/${couple.id}`

      axios.put(putUrl, {
        subject: couple.subject,
        office: couple.office,
        teacher: couple.teacher,
        beginning: couple.beginning,
        end: couple.end,
        groupId: couple.groupId
      })
    }
  }

  if (idsStudents.value.length) {
    for (const id of idsStudents.value) {
      const putUrl = `${changeGroupStudents}/${id}`
      console.log(putUrl)

      axios.put(putUrl, {
        groupId: Number(addUserGroupId)
      })
    }
  }

  if (idsTutors.value.length) {
    for (const id of idsTutors.value) {
      const putUrl = `${changeGroupTutors}/${id}`
      console.log(putUrl)
      axios.put(putUrl, {
        groupId: Number(addUserGroupId)
      })
    }
  }
}

const isShowStudentModal = ref<boolean>()
const openStudentModal = () => (isShowStudentModal.value = true)
const closeStudentModal = () => (isShowStudentModal.value = false)

const isShowTutorModal = ref<boolean>()
const openTutorModal = () => (isShowTutorModal.value = true)
const closeTutorModal = () => (isShowTutorModal.value = false)

const { animationBoolean } = move(300)
</script>

<template>
  <transition>
    <main v-if="animationBoolean" style="margin-top: 2%" class="main">
      <form @submit.prevent="updateSchedules()">
        <div class="main__schedule">
          <h1>Изменить расписание</h1>
          <button class="schedules-add" @click.prevent="openTutorModal()">Добавить куратора</button>
          <button style="margin-left: 2%" class="schedules-add" @click.prevent="openStudentModal()">
            Добавить Студентов
          </button>
          <CoupleTable
            :couples="couples.mondayCouple"
            :tutors-data="tutorsData"
            :title="'Понедельник'"
          />
          <CoupleTable
            :couples="couples.tuesdayCouple"
            :tutors-data="tutorsData"
            :title="'Вторник'"
          />
          <CoupleTable
            :couples="couples.wednesdayCouple"
            :tutors-data="tutorsData"
            :title="'Среда'"
          />
          <CoupleTable
            :couples="couples.thursdayCouple"
            :tutors-data="tutorsData"
            :title="'Четврерг'"
          />
          <CoupleTable
            :couples="couples.fridayCouple"
            :tutors-data="tutorsData"
            :title="'Пятница'"
          />
          <CoupleTable
            :couples="couples.saturdayCouple"
            :tutors-data="tutorsData"
            :title="'Суббота'"
          />
          <SelectStudentsTutors
            :api="tutors"
            v-model:ids="idsTutors"
            @close-modal="closeTutorModal()"
            v-if="isShowTutorModal"
            style="margin-top: 1%; text-align: center"
          />
          <SelectStudentsTutors
            :api="students"
            v-model:ids="idsStudents"
            @close-modal="closeStudentModal()"
            v-if="isShowStudentModal"
            style="margin-top: 1%; text-align: center"
          />
          <button type="submit" style="margin-top: 2%">Сохранить</button>
        </div>
      </form>
    </main>
  </transition>
</template>
../interfaces/iIdsObject
