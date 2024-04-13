import { ref } from 'vue'
import axios from 'axios'
import type { IGroups } from '@/interfaces/iGroups'

export function useFetch(
	apiURl: string,
	findItem: string,
	ownValue: string | number
) {
	const data = ref<IGroups[]|IGroups>()

	axios.get(apiURl).then(res => {
		const data:IGroups[] = res.data
		data.filter((item) => item[findItem] === ownValue)
	})

	return { data }
}