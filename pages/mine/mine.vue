<template>
	<view>
		<u-navbar title="Mine" leftIcon=""></u-navbar>
		<u-grid border align="center" class="grid">
			<u-grid-item v-for="(item,index) in baseList" :key="index" :customStyle="{width: '30vw',height: '30vw'}"
				@click="clickItem">
				<u-icon :name="item.name" size="40"></u-icon>
				<text>{{item.title}}</text>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseList: [{
					name: 'photo',
					title: '相片'
				}, {
					name: 'lock',
					title: '锁头'
				}, {
					name: 'star',
					title: '星星'
				}, {
					name: 'level',
					title: '等级'
				}, {
					name: 'red-packet',
					title: '红包'
				}, {
					name: 'fingerprint',
					title: '指纹'
				}, {
					name: 'trash',
					title: '垃圾桶'
				}, {
					name: 'shopping-cart',
					title: '购物车'
				}, {
					name: 'map',
					title: '地图'
				}, ]
			}
		},
		methods: {
			clickItem(e) {
				console.log(e)
				uni.showToast({
				    title: (e + 1).toString(),
					icon: 'none',
				    duration: 2000
				});
			}
		}
	}
</script>

<style lang="scss">
	.grid {
		transform: translateY(60%);
	}
</style>
