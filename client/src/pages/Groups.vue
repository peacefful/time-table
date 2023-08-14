<script setup lang="ts">
import { move } from '@/hooks/useAnimation';
import { ref } from 'vue';
import { useCrud } from '@/stores/crud';
import { groups } from '@/API/api-enterprises-institutions';
import router from "@/router";
import Header from '@/components/Header.vue';
import Title from "@/components/Title.vue";

const groupsDatas = ref<object[]>([])
const { getDatasFromApi } = useCrud()

getDatasFromApi(groups, groupsDatas)

const { animationBoolean } = move(500)
</script>

<template>
	<Header/>
	<transition>
		<main v-if="animationBoolean">
			<Title title="Группы"/>
			<div v-if="groupsDatas.length">
				<div v-for="group in groupsDatas" :key="group.id">
					<p>{{ group.groupName }}</p>
				</div>
			</div>
			<div style="margin-top: 1%;" v-else>
				Групп пока нету,<span @click="router.push({ name: 'newgroup', params: { form: 'add-group' }})">добавьте новую</span>
			</div>
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
</style>@/components/modal/openCloseDataModal