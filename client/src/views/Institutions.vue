<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { move } from '@/hooks/useAnimation';

const { animationBoolean } = move(500)
</script>

<template>
	<transition>
		<main style="text-align: center;" v-if="animationBoolean">
			<h3>Выберите группу</h3>
			<div v-if="condition"></div>
		</main>
	</transition>
</template>

<style lang="scss" scoped>
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>