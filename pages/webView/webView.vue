<template>
	<web-view :src="link" :progress="false"></web-view>
</template>

<script>
	export default {
		onLoad(options) {
			this.link = decodeURI(options.url)
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		data() {
			return {
				link: '',
				title: ''
			}
		}
	}
</script>

<style>
</style>
