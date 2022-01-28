<template>
	<u-skeleton
		    rows="10"
			:loading="loading"
			:title="false"
			rowsHeight="50"
		>
		<view>
			<view class="list-container">
				<view class="card item-box" v-for="item in data" :key="item.id" @click="jumpPage(item.link)">
					<text style="margin-right: 10px;">{{item.category}}:</text>
					<text style="text-decoration: underline;">{{item.name}}</text>
				</view>
			</view>
		</view>
		</u-skeleton>
	
</template>

<script>
	export default {
		props:{
			data: Array,
			loading: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			jumpPage(val){
				this.$emit('click', val)
			}
		}
	}
</script>

<style scoped lang="scss">
.item-box {
		padding: 30upx 20upx;
		color: #007AFF;
		&:active {
			color: #eee;
		}
	}
</style>
