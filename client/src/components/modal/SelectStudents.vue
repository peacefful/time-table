<script setup lang="ts">
import { students } from '@/API/api-enterprises-institutions';
import { useCrud } from "@/stores/crud";
import axios from 'axios';
import { ref, watch } from 'vue';

const showModal = ref<boolean>(true)
defineEmits(['closeModal'])

const crud = useCrud()
const studentsDatas = ref<object[]>([])
crud.getDatasFromApi(students, studentsDatas)

let groupId = Number(localStorage.getItem("groupId"))

console.log(groupId);

const groupsId = ref<number[]>([])
watch(groupsId, (x) => console.log(x))

const updateStudentGroup = async () => {
	for (const id of groupsId.value) {
		const putUrl = `${students}/${id}`
		await axios.put(putUrl, {
		groupId : ++groupId
	})
	}
}

</script>

<template>
		<main v-if="showModal">
			<div class="modal-form">
				<div class="modal-form__box">
					<img @click="$emit('closeModal')" src="../../assets/icons/close-icon.svg">
					<form @submit.prevent="updateStudentGroup()">
						<input 
							style="background-color: rgba(255, 255, 255, 0.079);" 
							type="text" 
							placeholder="Поиск"
						>
						<div v-for="student in studentsDatas" :key="student.id">
							<label for="checkbox">{{ student.surname }} {{ student.name }}</label>
							<input 
								style="margin-left: 3%;" 
								type="checkbox" 
								:value="student.id"
								v-model="groupsId"
							/>
						</div>
						<button type="submit">Сохранить</button>
					</form>
				</div>
			</div>
		</main>
</template>

<style scoped lang="scss">
</style>