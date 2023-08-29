<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import Header from '@/components/Header.vue';
import AddInstitution from '@/components/AddInstitution.vue';
import AddGroups from '@/components/AddGroups.vue';
import AddSchedules from '@/components/AddSchedules.vue';
import ShowSchedules from '@/components/ShowSchedules.vue';

defineProps<{
	form: string
}>()

const { animationBoolean } = move(600)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<div class="line"></div>
			<div v-if="form === 'add-institution'">
				<AddInstitution/>
			</div>
			<div v-else-if="form === 'add-group'">
				<AddGroups/>
			</div>
			<div v-else-if="form === 'add-schedules'">
				<AddSchedules/>
			</div>
			<div v-else-if="form === 'show-schedules'">
				<ShowSchedules/>
			</div>
		</main>
	</transition>
</template>