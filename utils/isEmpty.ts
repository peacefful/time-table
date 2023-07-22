export function isEmpty(obj:Request):boolean {
	for (const key in obj) {
		if (key === "") {
			return true
		}
	}
	return false
}