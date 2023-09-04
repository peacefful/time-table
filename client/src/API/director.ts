import axios from 'axios'
import { directors, groups, institutions, users } from '@/API/api-enterprises-institutions'

export async function getInstitutionData(institutionData: object) {
  try {
    const result = (await axios.get(institutions)).data
    institutionData.value = result.find(
      (item) => item.directorId === Number(localStorage.getItem('id'))
    )
    localStorage.setItem('institutionId', institutionData.value.id)
  } catch (error) {
    console.log(error)
  }
}

export async function getDirectorData(user: object[], appellation: string) {
  try {
    const dataUser: object[] = (await axios.get(directors)).data
    user.value = dataUser.find((item) => item.id === Number(localStorage.getItem('id')))
    appellation.value = user.value.institution.appellation
  } catch (error) {
    console.log(error)
  }
}

export async function getGroups(groupsHasSchedules: object[]) {
  try {
    const data: object[] = (await axios.get(groups)).data
    const selectGroups: object[] = data.filter(
      (item) => item.institutionId === Number(localStorage.getItem('id'))
    )
    groupsHasSchedules.value = selectGroups.filter((group) => group.monday.length !== 0)
  } catch (error) {
    console.log(error)
  }
}

export async function getStudentsForDirector(
  studentsData: object[],
  institutionId: string | number
) {
  try {
    const data: object[] = (await axios.get(users)).data
    const ownGroups: object[] = data.find((item) => item.institutionId === institutionId)

    const students = ownGroups.students
    students.forEach((student) => {
      studentsData.value.push({
        name: student.name,
        surname: student.surname,
        role: student.role
      })
    })
  } catch (error) {
    console.log(error)
  }
}
