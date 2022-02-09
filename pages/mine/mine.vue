<template>
	<view>
		<view class="header-userinfo">
			<view @click="loginHandle">
				<u-avatar :src="userInfo.icon || ' '" randomBgColor size="80" class="avatar"></u-avatar>
				<text class="username">{{userInfo.nickname|| '点击登录'}}</text> 
			</view>
		</view>
		<view class="operate-list card">
			<view class="item" v-for="item in list" :key="item.id" @click="jumpPage(item)">
				<view>
					<image :src="item.icon" width="30" height="30" class="image"></image>
					<text style="vertical-align: middle;">{{item.label}}</text>
				</view>
				<u-icon name="arrow-right" color="#666" size="18" v-if="item.path"></u-icon>
			</view>
		</view>
		<view class="button btn" style="width: 60%;" @click="loginoOutHandle" v-if="userInfo.nickname">退出登录</view>
	</view>
</template>

<script>
	import { request } from '@/common/request.js'
	import { mapMutations } from 'vuex'
	export default {
		onShow() {
			const {userInfo} = this.$store.state
			if(userInfo) this.userInfo = userInfo
		},
		data() {
			return {
				icon: '../../static/Android.png',
				userInfo:{},
				list: [{
					id: 1,
					label: '消息列表',
					icon: '../../static/chat.png',
					path: '/pages/mine/operateList/chat'
				},{
					id: 2,
					label: '评论列表',
					icon: '../../static/comment.png',
					path: '/pages/mine/operateList/comment'
				},{
					id: 3,
					label: '收藏',
					icon: '../../static/collect.png',
					path: '/pages/mine/operateList/collect'
				},{
					id: 4,
					label: '积分',
					icon: '../../static/point.png',
					path: '/pages/mine/operateList/point'
				}]
			}
		},
		methods: {
			...mapMutations(['SET_USERINFO']),
			loginHandle(e) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			loginoOutHandle() {
				uni.showLoading({
					title: '退出登录...',
					mask: true
				})
				request({
					url: '/user/logout/json'
				}).then(res=> {
					if(res.data.data === null) {
						this.SET_USERINFO(null)
						this.userInfo = {}
						uni.showToast({
							title: '退出登录成功',
							icon: 'success',
							duration: 2000,
							mask: true,
							success: () => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						})
					}else {
						uni.showToast({
							title: `${res.data.errorMsg}`,
							icon: 'error',
							duration: 1500
						})
					}
				})
			},
			jumpPage(event) {
				if(!this.userInfo.username) return uni.showToast({
					title: '还未登录，请先登录！',
					icon: 'none'
				})
				uni.navigateTo({
					url: event.path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-userinfo {
		position: relative;
		height: 30vh;
		background-color: #007AFF;
		text-align: center;
		box-shadow: 1px 0 10px 5px rgba(0, 123, 255, .5);
		&>view {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.avatar {
			margin: 10rpx auto;
		}
		.username {
			color: #FFFFFF;
		}
	}
	.operate-list {
		margin:20px 10px;
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			padding: 15rpx 20rpx;
			background-color: #FFFFFF;
			color: #333;
			border-bottom: #eee 1px solid;
			&:last-child {
				border: none;
			}
			.image {
				width: 50rpx;
				height: 50rpx;
				margin-right: 10px;
				vertical-align: middle;
			}
		}
	}
	.btn {
		position: fixed;
		bottom: 160rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
