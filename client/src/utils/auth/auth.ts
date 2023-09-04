/* eslint-disable no-inner-declarations */
import { authDirectors, institutions, users } from '@/API/api-enterprises-institutions'
import { makeAuthRequest } from '@/utils/auth/authData'
import router from '@/router'
import axios from 'axios'

const symbols: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '_']

export const authUser = async (
  name: string,
  surname: string,
  password: string,
  role: string,
  groupOrAppellation: string
) => {
  try {
    if (role === '') {
      throw new Error('Ошибка, не все поля были заполнены')
    } else {
      if (
        name.length >= 2 ||
        surname.length >= 2 ||
        (password.length >= 8 && symbols.includes(password))
      ) {
        if (role === 'Студент') {
          async function checkStudentGroup() {
            const institutionsData: object[] = (await axios.get(institutions)).data
            const institution = institutionsData.find(
              (institution) => institution.appellation === groupOrAppellation
            )
            const institutionId: object[] = institution.id

            const usersData: object[] = await (await axios.get(users)).data
            const institutionUsers = usersData.find((user) => user.institutionId === institutionId)

            const students: object[] = institutionUsers.students

            const isStudent = students.find((student) => {
              return student.name === name && student.surname === surname && student.role === role
            })

            if (isStudent) {
              const response = await makeAuthRequest(name, surname, password, role)

              if (response) {
                localStorage.setItem('appellation', groupOrAppellation)
                localStorage.setItem('token', response.token)
                localStorage.setItem('id', response.id)
                localStorage.setItem('role', response.role)
                router.push('/main')
              } else {
                throw new Error('Ответ сервера содержит некорректные данные')
              }
            } else {
              throw new Error('Пользователя в этом учреждении не существует')
            }
          }

          checkStudentGroup()
        } else {
          const response = await makeAuthRequest(name, surname, password, role)
          console.log()

          if (response) {
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', response.id)
            localStorage.setItem('role', response.role)
            localStorage.setItem('appellation', groupOrAppellation || null)
            router.push('/main')
          } else {
            throw new Error('Ответ сервера содержит некорректные данные')
          }
        }
      } else {
        throw new Error('Не корректные данные')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
