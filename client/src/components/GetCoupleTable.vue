<script setup lang="ts">

interface ICouples {
	id: number
	subject: string
	teacher: string
	office: string
	beginning: string
	end: string
}

defineProps<{
	title: string
	couples: ICouples[]
}>()

</script>

<template>
	<main>
		<div>
			<h3>{{ title }}</h3>
			<div v-for="couple in couples" :key="couple.id">
				{{ couple.subject }} {{ couple.beginning }}-{{ couple.end }}
				[{{ couple.office }}] ({{ couple.teacher }})
			</div>
		</div>
	</main>
</template>

<style scoped lang="scss"></style>