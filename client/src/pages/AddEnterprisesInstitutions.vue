<script setup lang="ts">
import { move } from '@/hooks/useAnimation'
import Header from '@/components/UI/Header.vue'
import AddInstitution from '@/components/AddInstitution.vue'
import AddGroups from '@/components/AddGroups.vue'
import AddSchedules from '@/pages/AddSchedules.vue'
import ShowSchedules from '@/pages/ShowSchedules.vue'
import UpdateSchedules from '@/pages/UpdateSchedules.vue'

defineProps<{
  form: string
}>()

const { animationBoolean } = move(600)
</script>
<template>
  <Header />
  <transition>
    <main v-if="animationBoolean">
      <div class="line"></div>
      <div v-if="form === 'add-institution'">
        <AddInstitution />
      </div>
      <div v-else-if="form === 'add-group'">
        <AddGroups />
      </div>
      <div v-else-if="form === 'create'">
        <AddSchedules />
      </div>
      <div v-else-if="form === 'schedules'">
        <ShowSchedules />
      </div>
      <div v-else-if="form === 'update'">
        <UpdateSchedules />
      </div>
    </main>
  </transition>
</template>
