<script setup lang="ts">
import { ref } from "vue"
import { computed } from 'vue'

const props = defineProps(['name', 'surname', 'password'])
const emit = defineEmits(['update:name', 'update:surname', 'update:password'])

const name = computed({
	get() {
		return props.name
	},
	set(value) {
		emit('update:name', value)
	}
})

const surname = computed({
	get() {
		return props.surname
	},
	set(value) {
		emit('update:surname', value)
	}
})

const password = computed({
	get() {
		return props.password
	},
	set(value) {
		emit('update:password', value)
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
	<input placeholder="Ваше имя" type="text" v-model="name">
	<input placeholder="Ваша фамилия" type="text" v-model="surname">
	<input placeholder="Пароль" :type="type" v-model="password">
	<label>
		<input type="checkbox" @click="showPassword()">
		Показать пароль
	</label>
</template>

<style scoped lang="scss">
input {
	padding: 2% 5%;
	margin-top: 2%;
	border-radius: 15px;
}

.registration {
	margin-top: 10%;
	display: flex;
	text-align: center;
	justify-content: center;
	.registration-login__flex{
		margin-top: 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
	}
}
</style>