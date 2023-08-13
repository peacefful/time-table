<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import Header from '@/components/Header.vue';
import Title from "@/components/Title.vue";

const { animationBoolean } = move(500)
</script>

<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<Title title="Группы"/>
		</main>
	</transition>
</template>

<style scoped lang="scss">
@import "../scss/variables.scss";

select{
	padding: 2%;
}
.form-group__post{
	@include button(rgb(0, 231, 0), white)
}
// .form-group {
// 	text-align: center;
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100vh;
// 	padding-top: 5%;
// 	background-color: rgba(0, 0, 0, 0.304);
// 	display: flex;
// 	justify-content: center;
// 	overflow-y: auto;
// 	.form-group__flex {
		
// 		max-height: 90vh;
// 		margin-top: 4%;
// 		display: flex;
// 		flex-direction: column;
// 	}
// }
</style>@/components/modal/openCloseDataModal