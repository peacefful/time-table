<script setup lang="ts">
import { ref } from "vue"
import { computed } from 'vue'

const props = defineProps<{
	name: string
	surname: string
	password: string
	role: string
}>()

const emit = defineEmits(['update:name', 'update:surname', 'update:password', 'update:role'])

const role = computed({
	get() {
		return props.role
	},
	set(value) {
		emit('update:role', value)
	}
})

let boolean = ref<boolean>(false)
let type = ref<string>("password")

const showPassword = () => {
	boolean.value = !boolean.value
	return type.value = boolean.value ? "text" : "password";
}
</script>

<template>
	<input 
		placeholder="Ваше имя" 
		type="text" 
		@input="$emit('update:name', $event.target.value)"
	>
	<input 
		placeholder="Ваша фамилия" 
		type="text" 
		@input="$emit('update:surname', $event.target.value)"
	>
	<input 
		placeholder="Пароль" 
		:type="type" 
		@input="$emit('update:password', $event.target.value)"
	>
	<label>
		<input type="checkbox" @click="showPassword()">
		Показать пароль
	</label>
	<select v-model="role">
		<option disabled value="">Ваша должность</option>
		<option value="Директор">Директор</option>
		<option value="Куратор">Куратор</option>
		<option value="Студент">Студент</option>
	</select>
</template>