<template>
	<view>
		<u-skeleton
			    rows="10"
				:loading="loading"
				:title="false"
				rowsHeight="80"
			>
		<view class="list-container">
			<view class="item-box card" v-for="item in data" :key="item.id" @click="jumpPage(item.link)">
				<view class="flex--justify top-item">
					<text>{{item.superChapterName}}</text>
					<text>{{item.niceShareDate || item.niceDate}}</text>
				</view>
				<text class="title" style="margin: 10px 0;">{{item.title}}</text>
				<view class="flex--justify bottom-item">
					<view>{{item.author || item.shareUser}}</view>
					<view>{{item.author ? '原创' : '转载'}}</view>
				</view>
			</view>
		</view>
		</u-skeleton>
	</view>
</template>

<script>
	export default {
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
.item-box {
		display: flex;
		flex-direction: column;
		.top-item {
			font-size: 24upx;
			text:first-child {
				padding: 10upx;
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
