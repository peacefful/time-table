<script lang="ts" setup>
import { groups, tutors } from '@/API/api-enterprises-institutions'
import { ref, reactive } from 'vue'
import { monday, tuesday, wednesday, thursday, friday, saturday } from '@/API/api-weekday'
import { getSchedulesTable } from '@/utils/getSchedulesTable'
import axios from 'axios'
import CoupleTable from '../components/EditCoupleTable.vue'

const tutorsData = ref<object[]>([])
const groupsData = ref<object[]>([])
const groupId = ref<string>('')

async function getTutorsData() {
  const data: object[] = (await axios.get(tutors)).data
  tutorsData.value = data.filter(
    (item) => item.userId === Number(localStorage.getItem('institutionId'))
  )
}

getTutorsData()

async function getGroups() {
  const data: object[] = (await axios.get(groups)).data
  groupsData.value = data.filter(
    (item) => item.institutionId === Number(localStorage.getItem('institutionId'))
  )
  console.log(groupsData.value)
}

getGroups()

const couples = reactive({
  mondayCouple: [],
  tuesdayCouple: [],
  wednesdayCouple: [],
  thursdayCouple: [],
  fridayCouple: [],
  saturdayCouple: []
})

function addCouple(couples: object[]) {
  couples.push(
    reactive({
      subject: '',
      office: '',
      teacher: '',
      beginning: '',
      end: '',
      groupId: null
    })
  )
}

async function createSchedulesTable() {
  const couplesWeeek = getSchedulesTable(
    couples.mondayCouple,
    couples.tuesdayCouple,
    couples.wednesdayCouple,
    couples.thursdayCouple,
    couples.fridayCouple,
    couples.saturdayCouple
  )

  for (const couple of couplesWeeek) {
    for (const item of couple.object) {
      item.groupId = groupId.value
      await axios.post(couple.api, item)

      item.subject = ''
      item.office = ''
      item.teacher = ''
      item.beginning = ''
      item.end = ''
    }
  }
}
</script>

<template>
  <main style="margin-top: 2%" class="main">
    <form @submit.prevent="createSchedulesTable()">
      <div class="main__schedule">
        <h1>Новое расписание</h1>
        <CoupleTable
          :couples="couples.mondayCouple"
          :tutors-data="tutorsData"
          :title="'Понедельник'"
          @add="addCouple(couples.mondayCouple)"
        />
        <CoupleTable
          :couples="couples.tuesdayCouple"
          :tutors-data="tutorsData"
          :title="'Вторник'"
          @add="addCouple(couples.tuesdayCouple)"
        />
        <CoupleTable
          :couples="couples.wednesdayCouple"
          :tutors-data="tutorsData"
          :title="'Среда'"
          @add="addCouple(couples.wednesdayCouple)"
        />
        <CoupleTable
          :couples="couples.thursdayCouple"
          :tutors-data="tutorsData"
          :title="'Четверг'"
          @add="addCouple(couples.thursdayCouple)"
        />
        <CoupleTable
          :couples="couples.fridayCouple"
          :tutors-data="tutorsData"
          :title="'Пятница'"
          @add="addCouple(couples.fridayCouple)"
        />
        <CoupleTable
          :couples="couples.saturdayCouple"
          :tutors-data="tutorsData"
          :title="'Суббота'"
          @add="addCouple(couples.saturdayCouple)"
        />
        <div>
          <select v-model="groupId">
            <option disabled value="">Ваша групппа</option>
            <option v-for="group in groupsData" :key="group.id" :value="group.id">
              {{ group.groupName }}
            </option>
          </select>
        </div>
        <button type="submit" style="margin-top: 1%">Сохранить</button>
      </div>
    </form>
  </main>
</template>

<style>
select {
  margin-top: 1%;
  padding: 0.5%;
}
</style>
