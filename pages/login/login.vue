<template>
	<view class="page">
		<view class="container card login-box">
			<u--form labelPosition="top" :model="userInfo" ref="form" :rules="rules" :labelStyle="{color: '#fff'}">
				<u-form-item label="姓名" prop="name" borderBottom>
					<u--input v-model="userInfo.name" border="none" class="item-form"></u--input>
				</u-form-item>
				<u-form-item label="密码" prop="pwd" borderBottom>
					<u--input v-model="userInfo.pwd" border="none"></u--input>
				</u-form-item>
				<u-form-item label="确认密码" prop="repwd" borderBottom labelWidth="100" ref="pwd">
					<u--input v-model="userInfo.repwd" border="none"></u--input>
				</u-form-item>
			</u--form>
			<view class="button btn" @click="clickHandle">登录</view>
		</view>
		<image src="../../static/android.png" class="image" mode="widthFix"/>
	</view>
</template>

<script>
	export default {
		onReady() {},
		data() {
			return {
				userInfo: {name: '', pwd: '', repwd: ''},
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
			clickHandle() {
				console.log("denglu")
				this.submitForm()
			},
			submitForm() {
				this.$refs.form.validate().then(res=> {
					console.log(res)
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
		background-color: rgba(255,255,255, .2);
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
		.item-from {
			color: #FFFFFF;
		}
	}
	.btn {
		margin-top: 60rpx;
	}
	.image {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 50vw;
	}
</style>
