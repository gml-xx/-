<template>
	<view>
		<u-skeleton
			    rows="10"
			    :title="false"
				:loading="loading"
				rowsHeight="50"
			>
		<view class="main-container">
			<u-divider text="目录"></u-divider>
			<view class="item-class flex--justify" v-for="item in treeData" :key="item.id" @click="jumpPage(item.id, item.name)">
				<text>{{item.name}}</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		</u-skeleton>
	</view>
</template>

<script>
	import {
		request
	} from '@/common/request.js'
	export default {
		onLoad() {
			this.getTreeData()
		},
		data() {
			return {
				treeData: [],
				loading: false
			}
		},
		methods: {
			getTreeData() {
				this.loading = true
				request({
					url: '/project/tree/json'
				}).then(res => {
					this.treeData = res.data.data
					this.loading = false
				})
			},
			jumpPage(id, name) {
				uni.navigateTo({
					url: `/pages/project/projectList/list?id=${id}&title=${name}`
				})
			},
		}
	}
</script>

<style scoped>
	.item-class {
		padding: 20upx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #eee;
		font-size: 28upx;
		color: #333;
	}
	.item-class:active {
		background-color: #EEEEEE;
	}
</style>
