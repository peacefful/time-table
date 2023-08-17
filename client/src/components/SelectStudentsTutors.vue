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
async function getStudents() {
	const data:object[] = (await axios.get(students)).data
	studentsData.value = data.filter(item => item.role !== "Куратор")
}

getStudents()
</script>

<template>
	<main class="modal" v-if="isShowModal">
		<form class="modal__form">
			<div class="modal__box">
				<img @click.prevent="$emit('closeModal')" src="../assets/icons/close-icon.svg">
				<input type="text" placeholder="Поиск" >
				<div style="padding-top: 3%;" v-for="student in studentsData" :key="student.id">
					<div>{{ student.name }}
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
.modal__form {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(21, 21, 21, 0.665);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow-y: auto;
	img{
		position: absolute;
		left: 90%;
		top: 4%;
		cursor: pointer;
		&:hover{
			opacity: 0.7;
		}
	}
	.modal__box{
		position: relative;
		max-width: 500px;
		background-color: rgb(0, 0, 0);
		border-radius: 4%;
		padding: 5% 10%;
		transition: all 2s;
	}
}
</style>