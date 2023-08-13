<script setup lang="ts">
import Header from '@/components/Header.vue';
import { move } from '@/hooks/useAnimation'
import Title from '@/components/Title.vue';

const { animationBoolean } = move(500)
</script>
<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<Title title="Расписание" />
		</main>
	</transition>
</template>