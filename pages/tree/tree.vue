<template>
	<view>
		<!-- <u-navbar leftIcon=" " title="知识体系" placeholder></u-navbar> -->
		<view class="main-container">
			<u-notify ref="uNotify"></u-notify>
			<view class="search-box">
				<u-search placeholder="请输入作者名称" height="40" v-model.trim="keyword" @search="jumpSearchPage" @custom="jumpSearchPage" showAction animation></u-search>
			</view>
			<u-divider text="目录" ></u-divider>
		<u-collapse
		accordion
		  >
		    <u-collapse-item
		      :title="item.name"
			  v-for="item in treeData"
			  :key="item.id"
		    >
			<view class="flex--justify" style="flex-wrap: wrap;">
				<view class="item-style tag-class" v-for="item2 in item.children" :key="item2.id" @click="jumpPage(item2.id, (item.name +'-'+ item2.name))">
				  {{item2.name}}
			  </view>
			</view>
		    </u-collapse-item>
		  </u-collapse>
		</view>
	</view>
</template>

<script>
	import { request } from '@/common/request.js'
	export default {
		onLoad() {
			this.getTreeData()
		},
		data() {
			return {
				keyword: '',
				treeData: []
			}
		},
		methods: {
			getTreeData() {
				request({
					url: '/tree/json'
				}).then(res=> {
					this.treeData = res.data.data
				})
			},
			jumpPage(id, name) {
				uni.navigateTo({
					url:`/pages/tree/articlePage/article?cid=${id}&title=${name}`
				})
			},
			jumpSearchPage() {
				if(!this.keyword) return this.$refs.uNotify.warning('请先输入搜索内容')
				uni.navigateTo({
					url: `/pages/tree/articlePage/searchArticle?keyword=${this.keyword}`
				})
			}
		}
	}
</script>

<style scoped>
.item-style {
	padding: 10px;
	
}
.tag-class {
	flex-grow: 1;
	padding: 10px;
	margin: 5px;
	background-color: #FFFFFF;
	border: 1px solid #fff;
	border-radius: 5px;
	text-align: center;
	box-shadow: -3px -3px 1px 1px rgba(255,255,255,.8),2px 2px 1px 1px rgba(173, 173, 173, 0.2);
}
.search-box {
	padding: 20upx;
}
</style>
