<script setup lang="ts">

defineProps<{
	button: string
	label: string
}>()

</script>
<template>
	<button type="submit">{{ button }}</button>
	<label><a @click="$emit('url')">{{ label }}</a></label>
</template>