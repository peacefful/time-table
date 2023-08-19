<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import Header from '@/components/Header.vue';
import AddInstitution from '@/components/Add-institution.vue';
import AddGroups from '@/components/Add-groups.vue';
import AddSchedules from '@/components/Add-schedules.vue';

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
		</main>
	</transition>
</template>

<style scoped lang="scss">

</style>