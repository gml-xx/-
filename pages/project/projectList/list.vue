<template>
	<view class="container">
		<u-skeleton
			    rows="10"
				:loading="loading"
				:title="false"
				rowsHeight="80"
			>
		<u-empty mode="data" :show="isEmpty"></u-empty>
		<u-divider text="没有更多了" v-if="nomore"></u-divider>
		<view class="list-container">
			<view class="item-container flex--justify card" v-for="item in data" :key="item.id" @click="jumpPage(item.link)">
				<u--image :showLoading="true" :src="item.envelopePic" width="80px" height="80px" radius="5" ></u--image>
				<view class="item-box ">
					<text class="title" style="margin: 10px 0;">{{item.title}}</text>
					<view>作者：{{item.author}}</view>
					<view class="flex--justify bottom-item">
						<view>{{item.superChapterName}}</view>
						<view>{{item.niceDate}}</view>
					</view>
				</view>
			</view>
		</view>
		</u-skeleton>
	</view>
</template>

<script>
	import { request } from '@/common/request.js'
	export default {
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
			this.cid = options.id
		},
		onShow() {
			this.loading = true
			this.getProjectList()
		},
		onReachBottom() {
			if(this.nomore) return uni.showToast({
				title: '没有更多数据了',
				icon: 'none',
				duration: 1000
			})
			this.pageNum++
			this.getProjectList()
		},
		data() {
			return {
				cid: '',
				pageNum: 1,
				nomore: false,
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
			getProjectList() {
				const {pageNum, cid} = this
				request({
					url: `/project/list/${pageNum}/json?cid=${cid}`
				}).then(res=> {
					const {data} = res.data
					if(pageNum === 0) {
						this.data = data.datas
					}else {
						this.data.push(...data.datas)
					}
					this.loading = false
					this.nomore = pageNum >= data.pageCount
					console.log(data.datas[0])
				})
			},
			jumpPage(val){
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

<style lang="scss" scoped>
	.item-container {
	}
.item-box {
		flex-grow: 2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10rpx;
		.bottom-item {
			font-size: 24upx;
			text:first-child {
				padding: 10upx;
				border-radius: 10upx;
				background-color: #007AFF;
				color: #FFFFFF;
			}
		}
		.bottom-item {
			color: #369;
		}
		.time {
			text-align: right;
			font-size: 24upx;
			color: #666;
		}
	}
</style>