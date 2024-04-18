const baseUrl="http://localhost:8000/api"
//导出一个名为http的方法
export function http(option){
	uni.showLoading({
		title:"加载中"
	})
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl+option.url,
			method: option.method || "GET",
			data:option.data|| {},
			header:option.header||{},
			success: res => {
				resolve(res)
			},
			fail:err=>{
				reject(err)
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
}