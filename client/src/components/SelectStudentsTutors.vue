<script setup lang="ts">
import { students } from '@/API/api-enterprises-institutions';
import { computed, ref } from 'vue';
import axios from 'axios';

const props = defineProps<{
	ids: string[]
}>()

const emit = defineEmits(['closeModal', 'update:ids'])

const ids = computed({
	get() {
		return props.ids
	},
	set(value) {
		emit('update:ids', value)
	}
})

const isShowModal = ref<boolean>(true)

const studentsData = ref<object[]>([])
const search = ref<string>("")

async function getStudents() {
	const data:object[] = (await axios.get(students)).data
	studentsData.value = data.filter(item => item.role !== "Куратор")
}

getStudents()

const findStudent = () => {
	return studentsData.value.filter(student => student.name.includes(search.value) || student.surname.includes(search.value))
}

</script>

<template>
	<main class="modal" v-if="isShowModal">
		<form class="modal__form">
			<div class="modal__box">
				<img @click.prevent="$emit('closeModal')" src="../assets/icons/close-icon.svg">
				<input type="text" placeholder="Поиск" v-model="search">
				<div style="padding-top: 3%;" v-for="student in findStudent()" :key="student.id">
					<div>{{ student.name }} {{ student.surname }}
						<input 
							type="checkbox" 
							:value="student.id"
							v-model="ids"
						>
					</div>
				</div>
				<div>
				</div>
				<button @click.prevent="$emit('closeModal')" style="margin-top: 10%; padding: 3% 6%;">Добавить</button>
			</div>
		</form>
	</main>
</template>

<style scoped lang="scss">
input[type='text'] {
	padding: 3%;
}
input[type='checkbox'] {
	margin-left: 5%;
}
</style>