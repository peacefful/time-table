import router from "@/router"

export const selectIdAndPushRouter = (url:string, paramsObj:object, institutionId:number) => {
	router.push({ name: url, params: { ...paramsObj }})
	localStorage.setItem('institutionId', institutionId.toString())
}