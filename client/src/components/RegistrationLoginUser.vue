<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  name: string
  surname: string
  password: string
}>()

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
let type = ref<string>('password')

const showPassword = () => {
  boolean.value = !boolean.value
  return (type.value = boolean.value ? 'text' : 'password')
}
</script>

<template>
  <input placeholder="Имя" type="text" v-model="name" />
  <input placeholder="Фамилия" type="text" v-model="surname" />
  <input placeholder="Пароль" :type="type" v-model="password" />
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
