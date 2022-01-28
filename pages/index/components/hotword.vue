<template>
	<u-skeleton
		    rows="5"
			:loading="loading"
			:title="false"
			rowsHeight="30"
		>
	<view class="flex--justify" style="flex-wrap: wrap;">
		<view class="tag-class" v-for="item in data" :key="item.id">
			{{item.name}}
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
				default: false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.tag-class {
	flex-grow: 1;
	padding: 10px;
	margin: 5px;
	background-color: #FFFFFF;
	border: 1px solid #fff;
	color: #666;
	font-weight: 600;
	border-radius: 5px;
	text-align: center;
	box-shadow: -3px -3px 1px 1px rgba(255,255,255,.8),2px 2px 1px 1px rgba(173, 173, 173, 0.2);
}
</style>
