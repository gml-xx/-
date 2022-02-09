import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		windowHeight: 0,
		userinfo: {}
	},
	mutations:{
		SET_WINDOWHEIGHT: state=> {
			uni.getSystemInfo({
				success:res=> {
					state.windowHeight = res.windowHeight
				}
			})
		},
		SET_USERINFO: (state, data)=> {
			state.userInfo = data
		}
	}
})
export default store