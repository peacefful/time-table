<script setup lang="ts">
import { ref } from 'vue'
import { move } from '../hooks/useAnimation'
import { registrationUser } from '../utils/auth/registration'
import { institutions } from '@/API/apiEnterprisesInstitutions'
import RegistrationLoginUser from '../components/RegistrationLoginUser.vue'
import ButtonLabel from '../components/UI/ButtonLabel.vue'
import router from '../router/index'
import axios from 'axios'
import type { IInstitutions } from '@/interfaces/iInstitution'

const name = ref<string>('')
const surname = ref<string>('')
const password = ref<string>('')
const role = ref<string>('')
const groupOrAppellation = ref<string>('')

const institutionsData = ref<IInstitutions[]>([])
async function getInstitutions() {
  institutionsData.value = (await axios.get(institutions)).data
}
getInstitutions()

const { animationBoolean } = move(500)
</script>

<template>
  <Transition name="slide-fade">
    <main v-if="animationBoolean" class="registration">
      <form @submit.prevent="registrationUser(name, surname, password, role, groupOrAppellation)">
        <h3>Регистрация</h3>
        <div class="registration-login__flex">
          <RegistrationLoginUser
            v-model:name="name"
            v-model:surname="surname"
            v-model:password="password"
          />
          <select v-model="role">
            <option disabled value="">Ваша должность</option>
            <option value="Директор">Директор</option>
            <option value="Куратор">Куратор</option>
            <option value="Студент">Студент</option>
          </select>
          <select
            v-model="groupOrAppellation"
            v-if="role === 'Студент' || role === 'Куратор'"
            style="margin-top: 8%"
          >
            <option disabled value="">Ваше учреждение</option>
            <option
              v-for="institution in institutionsData"
              :key="institution.id"
              :value="institution.appellation"
            >
              {{ institution.appellation }}
            </option>
          </select>
        </div>
        <ButtonLabel @url="router.push('/')" button="Зарегистрироваться" label="Войти" />
      </form>
    </main>
  </Transition>
</template>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
../mixins/auth../mixins/auth../utils/auth/registration
@/API/apiEnterprisesInstitutions