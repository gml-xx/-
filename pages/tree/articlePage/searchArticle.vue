<template>
	<view>
		<view class="search-box">
			<u-search placeholder="请输入作者名称" height="40" v-model="keyword" showAction animation></u-search>
			<u-divider text="搜索结果"></u-divider>
			<view class="main-container">
				<Article :data="data" :loading="loading"></Article>
			</view>
		</view>
	</view>
</template>

<script>
	import Article from '@/pages/index/components/article.vue'
	import { request } from '@/common/request.js'
	export default {
		onLoad(options) {
			this.keyword = options.keyword
		},
		data() {
			return {
				keyword: '',
				data: [],
				loading: false
			}
		},
		computed:{
			isEmpty() {
				return this.data.length === 0 && this.loading === false
			}
		},
		methods: {
			getArticleData() {
				request({
					url: `/article/list/0/json?author=鸿洋`
				}).then(res=> {
					console.log(res.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-box {
	padding: 20upx;
}
</style>
