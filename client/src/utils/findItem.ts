import axios from 'axios'
import type { IGroups } from '@/interfaces/iGroups'

export const getData = async (
  apiURl: string,
  arrayData: object[],
  findItem: string,
  ownValue: string | number
) => {
  try {
    const data: object[] = (await axios.get(apiURl)).data
    arrayData.value = data.find((item) => item[findItem] === ownValue)
  } catch (error) {
    console.log(error)
  }
}

export const getDatas = async (
  apiURl: string,
  arrayData: IGroups[],
  findItem: string,
  ownValue: string | number
) => {
  try {
    const data: IGroups[] = (await axios.get(apiURl)).data
    arrayData.value = data.filter((item) => item[findItem] === ownValue)
  } catch (error) {
    console.log(error)
  }
}