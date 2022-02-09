// #ifdef H5
const baseUrl = '/api'
// #endif
// #ifndef H5
const baseUrl = 'https://www.wanandroid.com'
// #endif

export function request(params) {
	const {url, method, data} = params
	return new Promise((resolve, reject)=> {
		uni.request({
			url: baseUrl + url,
			method: method || 'GET',
			header:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data,
			success: (res) => {
				resolve(res)
			},
			fail: (e) => {
				reject(e)
			}
		})
	})
}
