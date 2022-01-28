<template>
	<view class="container">
		<u-empty mode="data" :show="isEmpty"></u-empty>
		<Article :data="articleList" :loading="loading" @click="jumpPage"></Article>
		<u-divider text="没有更多了" v-if="nomore"></u-divider>
	</view>
</template>

<script>
	import {
		request
	} from '@/common/request.js';
	import Article from '@/pages/index/components/article.vue'
	export default {
		components:{
			Article
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
			this.cid = options.cid
		},
		onPullDownRefresh() {
			setTimeout(()=> {
				this.getArticleData()
				uni.stopPullDownRefresh()
			}, 1000 * 1)
		},
		onReachBottom() {
			if(this.nomore) return uni.showToast({
				title: '没有更多数据了',
				icon: 'none',
				duration: 1000
			})
			this.pageNum++
			this.getArticleData()
		},
		data() {
			return {
				cid: '',
				pageNum: 0,
				nomore: false,
				articleList: [],
				loading: false
			}
		},
		watch:{
			cid() {
				this.loading = true
				uni.startPullDownRefresh()
			}
		},
		computed:{
			isEmpty() {
				return this.articleList.length === 0 && this.loading === false
			}
		},
		methods: {
			getArticleData() {
				request({
					url: `/article/list/${this.pageNum}/json?cid=${this.cid}`
				}).then(res=> {
					const {data} = res.data
					if(this.pageNum === 0) {
						this.articleList = data.datas
					}else {
						this.articleList.push(...data.datas)
					}
					this.loading = false
					this.nomore = this.pageNum >= (data.pageCount - 1)
				})
			},
			jumpPage(val) {
				let url; 
				if(isNaN(val)) {
					url = val
				}else {
					url = this.bannerList[val].url
				}
				
				// #ifndef H5
				uni.navigateTo({
					url: '/pages/webView/webView?url=' + encodeURI(url)
				})
				// #endif
				// #ifdef H5
				window.open(url)
				// #endif
			}
		}
	}
</script>

<style>

</style>
