<script setup lang="ts">
defineProps<{
	title :string|undefined
}>()
</script>

<template>
	<main>
		<div class="line"></div>
		<h1 style="margin-top: 1%;">{{ title }}</h1>
	</main>
</template>