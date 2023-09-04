<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  name: string
  surname: string
  password: string
}>()

defineEmits(['update:name', 'update:surname', 'update:password'])

let boolean = ref<boolean>(false)
let type = ref<string>('password')

const showPassword = () => {
  boolean.value = !boolean.value
  return (type.value = boolean.value ? 'text' : 'password')
}
</script>

<template>
  <input placeholder="Имя" type="text" @input="$emit('update:name', $event.target.value)" />
  <input placeholder="Фамилия" type="text" @input="$emit('update:surname', $event.target.value)" />
  <input placeholder="Пароль" :type="type" @input="$emit('update:password', $event.target.value)" />
  <label>
    <input type="checkbox" @click="showPassword()" />
    Показать пароль
  </label>
</template>

<style scoped>
input {
  border: 0;
}
</style>
