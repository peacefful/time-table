import axios from "axios"

interface IItem {
	uuid: string
}

export const getData = async (api:string, arrDatas:object[]) => {
	const datas = (await axios.get(api)).data
	arrDatas.value = datas.find(( item:IItem ) => item.uuid === localStorage.getItem("uuid"))
}