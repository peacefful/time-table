<script setup lang="ts">
</script>

<template>
	<main style="margin-top: 2%;" class="main">
		<div class="main__schedule">
			<h1>Новое расписание</h1>
			<form class="main__schedule-form">
				<div class="main__schedule-input-text">
					<input type="text" placeholder="Предмет">
					<input type="text" placeholder="Кабинет">
					<select>
						<option disabled value="">Преподаватель</option>
						<option></option>
					</select>
				</div>
				<div class="main__schedule-input-number">
					<div style="margin-top: 1%;">
						<p>Начало</p>
						<input 
							type="number" 
							style="margin-right: 0.5%;" 
							placeholder="8"
							max="24"
							min="0"
						>:
						<input 
							type="number" 
							placeholder="00"
							max="24"
							min="0"
						>
					</div>
					<div style="margin-top: 1%;">
						<p>Конец</p>
						<input 
							type="number" 
							placeholder="13"
							max="24"
							min="0"
							style="margin-right: 0.5%;"
						>:
						<input 
							type="number" 
							placeholder="00"
							max="24"
							min="0"
						>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>

<style scoped lang="scss">
input[type='text'] {
	padding: 0.5%;
	margin: 0;
	border: 0;
	max-width: 300px;
}

select {
	margin-top: 1%;
	padding: 0.5%;
}

input[type='number'] {
	text-align: center;
	margin: 0;
	border: 0;
	padding: 0.5%;
	max-width: 60px;
}
.main {
	.main__schedule {
		text-align: center;
	}
	.main__schedule-form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		.main__schedule-input-text {
			display: flex;
			flex-direction: column;
			align-items: center;
			input {
				margin-top: 1%;
			}
		}
	}
}

</style>