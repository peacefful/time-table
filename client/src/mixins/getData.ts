import axios from "axios"

export const getData = async (api:string, arrDatas:object[]) => {
	arrDatas.value = (await axios.get(api)).data
}