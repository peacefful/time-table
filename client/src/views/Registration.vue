<script setup lang="ts">
</script>

<template>
	<main class="registration">
		<form @submit.prevent="">
			<div class="registration__flex">
				<p>Регистрация</p>
				<input placeholder="Ваше имя" type="text">
				<input placeholder="Ваше фамилия" type="text">
				<input placeholder="Пароль" type="password">
				<button>Зарегистрироваться</button>
			</div>
		</form>
	</main>
</template>

<style scoped>
input {
	padding: 4% 8%;
	margin-top: 2%;
	border-radius: 15px;
}

.registration {
	
	margin-top: 10%;
	display: flex;
	justify-content: center;
	.registration__flex{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 400px;
	}
}
</style>
