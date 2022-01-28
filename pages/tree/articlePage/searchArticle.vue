<template>
	<view>
		<view class="search-box">
			<u-search placeholder="请输入作者名称" height="40" v-model.trim="keyword" showAction animation @search="getArticleData" @custom="getArticleData"></u-search>
			<u-divider text="搜索结果"></u-divider>
			<view class="main-container">
				<u-empty mode="data" :show="isEmpty"></u-empty>
				<Article :data="data" :loading="loading"></Article>
				<u-divider text="没有更多了" v-if="nomore"></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
	import Article from '@/pages/index/components/article.vue'
	import { request } from '@/common/request.js'
	export default {
		components:{
			Article
		},
		onLoad(options) {
			const { keyword } = options
			this.keyword = keyword
		},
		onShow() {
			this.loading = true
			this.getArticleData()
		},
		onReachBottom() {
			if(this.nomore) return uni.showToast({
				title: "没有更多数据了",
				icon:'none',
				duration: 1000
			})
			this.pageNum++
			this.getArticleData()
		},
		data() {
			return {
				keyword: '',
				data: [],
				loading: false,
				pageNum: 0,
				nomore: false
			}
		},
		watch:{
			keyword(val){
				uni.setNavigationBarTitle({
					title: `" ${val} " 相关的文章`
				})
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
					url: `/article/list/${this.pageNum}/json?author=${this.keyword}`
				}).then(res=> {
					const pageNum = this.pageNum
					const {data} = res.data
					this.loading = false
					if(pageNum === 0) {
						this.data = data.datas
					}else {
						this.data.push(...data.datas)
					}
					this.nomore = pageNum >= data.pageCount
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
