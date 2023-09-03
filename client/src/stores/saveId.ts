import { defineStore } from "pinia";

export const useSaveId = defineStore("saveId", () => {
	function getUniqueIds(id: number, arrayUniqueIds: number[]) {
		if (!arrayUniqueIds.includes(id)) {
			arrayUniqueIds.push(id);
		}
	}
	
	return { getUniqueIds }
})