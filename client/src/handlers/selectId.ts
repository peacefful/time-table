import router from "@/router"

// url:string, paramsObj:object, 

export const selectIdAndPushRouter = (key:string, id:number):number => {
	// router.push({ name: url, params: { ...paramsObj }})
	localStorage.setItem(key, id.toString())
	return Number(localStorage.getItem(key))
}