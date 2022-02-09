<template>
	<view class="page">
		<view class="container card login-box">
			<u--form labelPosition="top" :model="userInfo" ref="form" :rules="rules" :labelStyle="{color: '#fff'}">
				<u-form-item label="姓名" prop="name" borderBottom>
					<u--input v-model="userInfo.name" border="none" class="item-form" clearable></u--input>
				</u-form-item>
				<u-form-item label="密码" prop="pwd" borderBottom>
					<u--input v-model="userInfo.pwd" border="none" clearable type="password"></u--input>
				</u-form-item>
				<u-form-item label="确认密码" prop="repwd" borderBottom labelWidth="100" ref="pwd" v-if="!isLogin">
					<u--input v-model="userInfo.repwd" border="none" clearable type="password"></u--input>
				</u-form-item>
			</u--form>
			<view class="btn-group">
				<view :class="['button', 'btn', {active: isLogin}]" @click="clickHandle(0)">登录</view>
				<view :class="['button', 'btn', {active: !isLogin}]" @click="clickHandle(1)">注册</view>
			</view>
		</view>
		<image :src="src" class="image" mode="widthFix" />
	</view>
</template>

<script>
	import { request } from '@/common/request.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				src: '../../static/android.png',
				userInfo: {
					name: '',
					pwd: '',
					repwd: ''
				},
				isLogin: true,
				rules: {
					name: [{
						required: true,
						message: '请输入姓名'
					}],
					pwd: [{
						required: true,
						message: '请输入密码'
					}],
					repwd: [{
						required: true,
						message: '请再次输入密码'
					}]
				},
			}
		},
		methods: {
			...mapMutations(['SET_USERINFO']),
			clickHandle(val) {
				const flag = val === 0 ? true : false
				if(this.isLogin === flag) {
					this.submitForm()
				}else {
					this.$refs.form.clearValidate()
				}
				this.isLogin = flag
				uni.setNavigationBarTitle({
					title: flag ? '登录' : '注册'
				})
			},
			submitForm() {
				this.$refs.form.validate().then(res => {
					uni.showLoading({
						title: '请稍后...',
						mask: true
					})
					if(this.isLogin) this.loginHandle()
					else this.registerHandle()
				})
			},
			loginHandle() {
				const {name: username , pwd: password} = this.userInfo
				request({
					url: '/user/login',
					method: 'POST',
					data: {
						password,
						username,
					}
				}).then(res=> {
					if(res.data.errorCode !== 0) {
						uni.showToast({
							title: `${res.data.errorMsg}`,
							icon:'none',
							duration: 1500
						})
					}else {
						uni.setStorage({
							key: "userinfo",
							data: JSON.stringify(res.data.data)})
						this.SET_USERINFO(res.data.data)
						uni.showToast({
							title: '登录成功！',
							icon: 'success',
							duration: 1500,
							success: () => {
								uni.navigateBack({
									delta: 1
								})
							}
						})
					}
				})
			},
			registerHandle() {
				const {name: username , pwd: password, repwd: repassword} = this.userInfo
				request({
					url: '/user/register',
					method: 'POST',
					data: {
						repassword,
						password,
						username,
					}
				}).then(res=> {
					if(res.data.errorCode !== 0) {
						uni.showToast({
							title: `${res.data.errorMsg}`,
							icon: 'none',
							duration: 1500
						})
					}else {
						uni.showToast({
							title: '注册成功,正在登录...',
							icon: 'success',
							duration: 1500
						})
						this.loginHandle()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		background-color: #007AFF;
		overflow: hidden;
	}

	.nav-style {
		background-color: #007AFF;
	}

	.login-box {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 80%;
		transform: translate(-50%, -90%);
		background-color: rgba(255, 255, 255, .2);

		& {
			text-align: center;
			font-size: 32px;
			font-weight: 700;
			border: 2px solid rgba(216, 242, 255, .9);
			user-select: none
		}

		&::after {
			content: '';
			width: 100%;
			height: 100%;
			backdrop-filter: blur(3px);
			background: rgba(216, 242, 255, .13);
			filter: blur(3px);
		}

		.item-form {
			font-size: 40rpx;
			color: #FFFFFF !important;
		}
	}

	.btn-group {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

		.active {
			width: 70%;
			font-size: 60rpx;
			transition: all .25s linear;
		}
	}

	.btn {
		font-size: 30rpx;
		margin-top: 60rpx;

		&:last-child {
			background-color: #18BC37;
		}
	}

	.image {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 50vw;
	}
</style>
