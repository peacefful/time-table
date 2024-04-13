import router from '@/router'
import { DIRECTORS_API, institutions } from '@/API/apiEnterprisesInstitutions'
import { makeRegRequest } from './regData'
import axios from 'axios'

const symbols: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '_']

export const registrationUser = async (
  name: string,
  surname: string,
  password: string,
  role: string,
  groupOrAppellation: string
) => {
  try {
    if (role == '') {
      throw new Error('Ошибка, не все поля были заполнены')
    } else {
      if (
        name.length >= 2 ||
        surname.length >= 2 ||
        (password.length >= 8 && symbols.includes(password))
      ) {
        if (role === 'Студент' || role === 'Куратор') {
          // eslint-disable-next-line no-inner-declarations
          async function registrationStudentsTutors() {
            const result: object[] = (await axios.get(institutions)).data
            const institution: object = result.find(
              (item) => item.appellation === groupOrAppellation
            )

            const users: object[] = institution.users
            await makeRegRequest(name, surname, password, role, users.id)
            router.push('/')
          }
          registrationStudentsTutors()
        } else {
          await makeRegRequest(name, surname, password, role, Number(DIRECTORS_API))
          router.push('/')
        }
      } else {
        throw new Error('Не корректные данные')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
