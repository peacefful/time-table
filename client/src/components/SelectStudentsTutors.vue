<script setup lang="ts">
import { computed, ref } from 'vue';
import axios from 'axios';

const props = defineProps<{
	ids: string[]
	api: string
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
const usersData = ref<object[]>([])
const search = ref<string>("")

async function getUsers() {
	const data:object[] = (await axios.get(props.api)).data
	const ownUsers = data.filter(item => item.userId === Number(localStorage.getItem("institutionId")))

	usersData.value = ownUsers
}

getUsers()

const findStudent = () => {
	const searchValueParts = search.value.split(" ")

	if (searchValueParts.length === 1) {
		return usersData.value.filter(user => user.name.includes(search.value) || user.surname.includes(search.value))
	} else if (searchValueParts.length === 2) {
		const firstNamePart = searchValueParts[0];
		const lastNamePart = searchValueParts[1];

		return usersData.value.filter(user => {
			return (user.name.includes(firstNamePart) && user.surname.includes(lastNamePart)) ||
			(user.name.includes(lastNamePart) && user.surname.includes(firstNamePart))
		})
	} else {
		return [];
	}
}

</script>

<template>
	<main class="modal" v-if="isShowModal">
		<form class="modal__form">
			<div class="modal__box">
				<img @click.prevent="$emit('closeModal')" src="../assets/icons/close-icon.svg">
				<input type="text" placeholder="Поиск" v-model="search">
				<div style="padding-top: 3%;" v-for="user in findStudent()" :key="user.id">
					<div>{{ user.name }} {{ user.surname }} ({{ user.role }})
						<input 
						type="checkbox" 
						:value="user.id"
						v-model="ids"
						>
					</div>
				</div>
				{{ ids }}
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