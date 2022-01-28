<template>
	<view>
		<Article :data="data" :loading="loading"></Article>
	</view>
</template>

<script>
	import Article from './article.vue'
	export default {
		components:{
			Article
		},
		props:{
			data: Array,
			loading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>
