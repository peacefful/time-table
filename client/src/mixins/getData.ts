import axios from "axios"

interface IItem {
	id: number
}

export const getData = async (api:string, arrDatas:object[]) => {
	const datas = (await axios.get(api)).data
	arrDatas.value = datas.find(( item:IItem ) => item.id === parseInt(localStorage.getItem("id")))
}