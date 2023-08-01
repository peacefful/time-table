import axios from "axios"

export const getData = async (api:string, arrDatas:object[]) => {
	const datas = (await axios.get(api)).data
	arrDatas.value = datas.find(item => item.id === parseInt(localStorage.getItem("id")))
}