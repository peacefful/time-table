<script setup lang="ts">

defineProps<{
	button: string
	label: string
}>()

defineEmits(['url'])

</script>
<template>
	<button type="submit">{{ button }}</button>
	<label><a @click="$emit('url')">{{ label }}</a></label>
</template>

<style scoped lang="scss">
button {
	@extend %button !optional;
	padding: 1.5% 5%;
	margin-top: 4%;
}
</style>