<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from "vue"

defineProps<{
	button: string
	label: string
}>()

</script>
<template>
	<button type="submit">{{ button }}</button>
	<label><a>{{ label }}</a></label>
</template>