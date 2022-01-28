import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		windowHeight: 0
	},
	mutations:{
		SET_WINDOWHEIGHT: state=> {
			uni.getSystemInfo({
				success:res=> {
					state.windowHeight = res.windowHeight
				}
			})
		}
	}
})
export default store