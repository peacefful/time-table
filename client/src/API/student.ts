import {
  directors,
  groups,
  institutions,
  students,
  users
} from '@/API/api-enterprises-institutions'
import axios from 'axios'

export async function getDirector(arrayData: object[], ownValueFind: string | number) {
  try {
    const data: object[] = (await axios.get(directors)).data
    arrayData.value = data.find(
      (director) => director.institution.appellation === ownValueFind.value
    )
  } catch (error) {
    console.log(error)
  }
}

export async function getStudentData(user: object[], group: string) {
  try {
    const dataUser: object[] = (await axios.get(students)).data
    user.value = dataUser.find((item) => item.id === Number(localStorage.getItem('id')))

    const dataGroup: object[] = (await axios.get(groups)).data
    const ownGroup: object = dataGroup.find((group) => group.id === user.value.groupId)

    group.value = ownGroup.groupName
  } catch (error) {
    console.log(error)
  }
}

export async function getStudentSchedules(schedulesData: object[]) {
  try {
    const data: object[] = (await axios.get(groups)).data

    schedulesData.value = data.find((item) => {
      const students: object[] = item.students
      return students.find((student) => student.id === Number(localStorage.getItem('id')))
    })
    console.log(schedulesData.value)
  } catch (error) {
    console.log(error)
  }
}

export async function getStudents(studentsData: object[]) {
  try {
    const dataInstitutions: object[] = (await axios.get(institutions)).data
    const appellation = dataInstitutions.find(
      (item) => item.appellation === localStorage.getItem('appellation')
    )
    const usersInstitutionId = appellation.id

    const dataUsers: object[] = (await axios.get(users)).data
    const ownUsers = dataUsers.find((users) => users.institutionId === usersInstitutionId)

    studentsData.value = ownUsers.students
  } catch (error) {
    console.log(error)
  }
}

export async function getGroup(groupsDatas: object[]) {
  try {
    const data: object[] = (await axios.get(groups)).data
    groupsDatas.value = data.find((item) => {
      const students: object[] = item.students
      return students.find((student) => student.id === Number(localStorage.getItem('id')))
    })
  } catch (error) {
    console.log(error)
  }
}
