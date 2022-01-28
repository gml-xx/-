<template>
	<view class="container">
		<!-- <u-navbar title="玩安卓" leftIcon=" " safeAreaInsetTop placeholder v-if="opacity >= 0" :style="{opacity}"></u-navbar> -->
		<view class="banner">
			<u-swiper height="150" :list="bannerList" keyName="imagePath" showTitle autoplay circular @click="jumpPage">
			</u-swiper>
		</view>
		<view class="main-container">
			<u-sticky>
				<view class="tab-bar">
					<u-tabs :list="tabList" @click="clickTabHandle"></u-tabs>
				</view>
			</u-sticky>
			<u-empty mode="data" :show="isEmpty"></u-empty>
			<view class="list-container">
				<Article v-if="currentIndex === 0" :data="listData" :loading="loading" @click="jumpPage" />
				<WebSite v-if="currentIndex === 1" :data="listData" :loading="loading" @click="jumpPage" />
				<HotWord v-if="currentIndex === 2" :data="listData" :loading="loading" @click="jumpPage" />
				<Stick v-if="currentIndex === 3" :data="listData" :loading="loading" @click="jumpPage" />
			</view>
		</view>
		<u-divider text="到底了" v-if="nomore"></u-divider>
		<u-back-top :scroll-top="scrollTop" :customStyle="{backgroundColor: '#007AFF'}" :iconStyle="{color: '#fff'}">
		</u-back-top>
	</view>
</template>

<script>
	import {
		request
	} from '@/common/request.js'
	import Article from './components/article.vue'
	import WebSite from './components/website.vue'
	import HotWord from './components/hotword.vue'
	import Stick from './components/stick.vue'
	export default {
		components: {
			Article,
			WebSite,
			HotWord,
			Stick
		},
		onLoad() {
			this.getBanner()
			uni.startPullDownRefresh()
			uni.getSystemInfo({
				success: (result) => {
					result.windowHeight
				}
			})
		},
		onPullDownRefresh() {
			this.loading = true
			setTimeout(() => {
				if (this.currentIndex !== 0) {
					this.getWebSite_HotWord_Stick()
				} else {
					this.pageNum = 0
					this.getListData()
				}
				uni.stopPullDownRefresh()
			}, 1000 * 1)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			if (this.nomore) return uni.showToast({
				title: "没有更多数据了",
				icon: 'none',
				duration: 2000
			})
			if (this.currentIndex !== 0) return this.getWebSite_HotWord_Stick()
			this.pageNum++
			this.getListData()
		},
		watch: {
			scrollTop(val) {
				const height = this.$store.state.windowHeight
				this.opacity = 1 - (val / height) * 2
			}
		},
		computed: {
			isEmpty() {
				return !this.listData.length > 0 && this.loading === false
			}
		},
		data() {
			return {
				tabList: [{
					name: '推荐'
				}, {
					name: '常用网站'
				}, {
					name: '搜索热词'
				}, {
					name: '置顶文章'
				}],
				currentIndex: 0,
				pageNum: 0,
				nomore: false,
				bannerList: [],
				listData: [],
				scrollTop: 0,
				opacity: 1,
				loading: false
			}
		},
		methods: {
			// banner
			getBanner() {
				request({
					url: '/banner/json',
				}).then(res => {
					const data = res.data.data
					this.bannerList = data
				})
			},
			// 文章列表
			getListData() {
				let url = `/article/list/${this.pageNum}/json`;
				request({
					url: url,
				}).then((res) => {
					this.loading = false
					const {
						pageNum
					} = this
					const {
						data
					} = res.data
					if (pageNum === 0) {
						this.listData = data.datas
					} else {
						this.listData.push(...data.datas)
					}

					this.nomore = pageNum >= data.pageCount
				})
			},
			getWebSite_HotWord_Stick() {
				const index = this.currentIndex
				let url;
				switch (index) {
					case 1:
						url = `/friend/json`
						break;
					case 2:
						url = `/hotkey/json`
						break;
					case 3:
						url = `/article/top/json`
						break;
				}
				request({
					url
				}).then(res => {
					this.loading = false
					this.listData = res.data.data || res.data
					this.nomore = true
				})
			},
			clickTabHandle(e) {
				this.nomore = false
				this.currentIndex = e.index
				uni.startPullDownRefresh()
			},
			jumpPage(val) {
				let url;
				if (isNaN(val)) {
					url = val
				} else {
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

<style lang="scss">
	.banner {
		margin-bottom: 20px;
	}

	.main-container {
		.tab-bar {
			margin-bottom: 20upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
		}

		.list-container {
			margin: 5upx;
		}
	}

	.item-box {
		display: flex;
		flex-direction: column;

		.top-item {
			font-size: 24upx;

			text:first-child {
				padding: 0 10upx;
				border-radius: 10upx;
				background-color: #007AFF;
				color: #FFFFFF;
			}

			text:last-child {
				color: #666;
			}
		}

		.bottom-item {
			color: #369;
		}
	}
</style>
