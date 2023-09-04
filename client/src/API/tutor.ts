import { defineStore } from 'pinia'
import axios from 'axios'
import { groups, tutors } from '@/API/api-enterprises-institutions'

export const useTutorStore = defineStore('tutorStore', () => {
  async function findAuthTutor(groupsDatas: object[]) {
    try {
      const data: object[] = (await axios.get(groups)).data
      groupsDatas.value = data.find((item) => {
        const tutors: object[] = item.tutors
        return tutors.find((tutor) => tutor.id === Number(localStorage.getItem('id')))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getTutorData(user: object[], group: string) {
    try {
      const dataUser: object[] = (await axios.get(tutors)).data
      user.value = dataUser.find((item) => item.id === Number(localStorage.getItem('id')))

      const dataGroup: object[] = (await axios.get(groups)).data
      const ownGroup: object = dataGroup.find((group) => group.id === user.value.groupId)

      group.value = ownGroup.groupName
    } catch (error) {
      console.log(error)
    }
  }

  async function getTutorSchedules(schedulesData: object[]) {
    const data: object[] = (await axios.get(groups)).data
    schedulesData.value = data.find((item) => {
      const tutors: object[] = item.tutors
      return tutors.find((tutor) => tutor.id === Number(localStorage.getItem('id')))
    })
  }

  return { findAuthTutor, getTutorData, getTutorSchedules }
})
