<template>
	<view class="container">
		<u-skeleton rows="10" :loading="loading" :title="false" rowsHeight="80">
			<u-empty mode="data" :show="isEmpty"></u-empty>
			<view class="card item" v-for="item in data" :key="item.id" @click="jumpPage(item.link)">
				<view class="title">{{item.title}}</view>
				<view>发布时间： {{item.publishTime | timeFormat}}</view>
				<text>作者： {{item.author}}</text>
			</view>
			<view class="button btn">
				<u-icon name="plus" color="#fff"></u-icon>
			</view>
			<u-divider text="没有更多了" v-if="nomore"></u-divider>
		</u-skeleton>
	</view>
</template>

<script>
	import {
		request
	} from '@/common/request.js'
	import { timeFormat } from '@/utils/index.js'
	export default {
		onLoad() {
			this.loading = true
			this.getCollectList()
		},
		onReachBottom() {
			if(this.nomore) return
			this.pageNum++
			this.getCollectList()
		},
		data() {
			return {
				pageNum: 0,
				nomore: false,
				data: [],
				loading: false
			};
		},
		computed:{
			isEmpty() {
				return this.data.length === 0
			}
		},
		methods: {
			getCollectList() {
				request({
					url: `/lg/collect/list/${this.pageNum}/json`
				}).then(res => {
					this.loading = false
					const {
						pageNum
					} = this
					const {
						data
					} = res.data
					if (pageNum === 0) {
						this.data = data.datas
					} else {
						this.data.push(...data.datas)
					}

					this.nomore = pageNum + 1 >= data.pageCount
				})
			},
			jumpPage(link) {
				// #ifndef H5
				uni.navigateTo({
					url: '/pages/webView/webView?url=' + encodeURI(link)
				})
				// #endif
				// #ifdef H5
				window.open(link)
				// #endif
			}
		},
		filters:{
			timeFormat
		}
	}
</script>

<style lang="scss" scoped>
.item {
	color: #666666;
	line-height: 1.2;
	.title{
		margin-bottom: 20rpx;
		color: #333333;
	}
}
.btn {
	position: fixed;
	bottom: 10vh;
}
</style>
