import { students, DIRECTORS_API, tutors } from '@/API/apiEnterprisesInstitutions'
import axios from 'axios'

export const makeRegRequest = async (
  name: string,
  surname: string,
  password: string,
  role: string,
  userId?: number
) => {
  try {
    if (role === 'Куратор') {
      const response = await axios.post(tutors, {
        name,
        surname,
        password,
        role,
        userId: userId
      })
      return response.data
    } else if (role === 'Студент') {
      const response = await axios.post(students, {
        name,
        surname,
        password,
        role,
        userId: userId
      })
      return response.data
    } else {
      const response = await axios.post(DIRECTORS_API, {
        name,
        surname,
        password,
        role
      })
      return response.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
