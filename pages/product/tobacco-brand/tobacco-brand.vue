<template>
	<view class="page1">
		<h2 align="center" style="margin-top: 50rpx">
		      【{{ pinpai }}】品牌各规格好评率排行榜
		</h2>
		<view class="grid-item item1" style="margin-top: 20px">
		  <el-radio-group v-model="radio" @change="radioChange">
			<el-radio-button label="1">原始好评率</el-radio-button>
			<el-radio-button label="2">贝叶斯修正的好评率</el-radio-button>
		  </el-radio-group>
		</view>
		<view style="margin-top: 30rpx;"></view>
		<view class="flex" v-for="(item,index) in productlist" :key="index" 
		@tap="gotobrand(item)" style="margin-top: 20rpx; ">
			<text  style="width: 200rpx;">{{productlist[productlist.length-1-index].productname}}</text>
		    <view class="cu-progress round striped active" style="margin-right: 30rpx;">
				<!-- <view class="bg-cyan" :style="[{ width:loading?'80%':''}]">{{Math.floor(productlist[productlist.length-1-index].goodrate*100)}}%</view> -->
				 <!-- <view class="bg-red" :style="{ width: loading ? index + '%' : '' }">{{ index }}%</view> -->
				<view class="bg-cyan" :style="[{ width:loading?  (100-index*2.3)+'%':''}]" >{{Math.floor(100-index*2.3)}}%</view>
		    </view>
		</view>
		
		{{ printInfo }}
		<view id="myChart" :style="{ margin: '0 auto' }"></view>
		
	</view>
</template>

<script>
import * as echarts from "echarts";
import Vue from "vue";
import { Loading } from "element-ui";
import {http} from "../../../utils/request.js";

	export default {
		data() {
			return {
				loading: false,
				name: '',
				pinpai: null,
				productlist: [],
				idList: [],
				rawdata: [],
				productnamelist1: [],
				productnamelist2: [],
				goodratelist: [],
				goodratefixedlist: [],
				commnumlist1: [],
				commnumlist2: [],
				printInfo: "",
				radio: 1,
			};
		},
		onLoad: function() {
					let that = this;
					setTimeout(function() {
						that.loading = true
					}, 500)
				},
		created() {
			// 在组件创建时获取查询参数
			this.pinpai = this.$route.query.name;
		},
		mounted() {
			//template挂载到页面时调用
			this.fetchData();
		},
		watch: {
			// 监视路由参数变化
			'$route.query.name'(newName) {
				this.name = newName;
			}
		},
		methods: {
			gotobrand: function(item){
				const itemName = item.productname; // 假设名字存储在元素的nameKey属性中
				      console.log(itemName);
				  // 构建动态跳转路径，传递选中元素的名字作为参数
				  const url = '/pages/product/tobacco-brand/sub-brand?name=' + itemName;
				if(itemName != "卷烟品牌"){
				  // 跳转到新页面，携带参数
				  uni.navigateTo({
				    url: url,
				    success: res => {
				      console.log('页面跳转成功');
				    },
				    fail: err => {
				      console.error('页面跳转失败', err);
				    }
				  });}
			},
			compare(property, s) {
			  //排序
			  return function (a, b) {
				var value1 = a[property];
				var value2 = b[property];
				if (s == 1) {
				  return value1 - value2;
				} else {
				  return value2 - value1;
				}
			  };
			},
		
			radioChange() {
			  if (this.radio == 1) {
				this.drawa();
			  } else if (this.radio == 2) {
				console.log("changed");
				this.drawb();
			  }
			},
		
			
			fetchData() {
			  let self = this;
			    uni.showLoading({
			      title: '加载中...',
			      mask: true
			    });
			    http({ 
			      url: '/get_productname_and_goodrate',
			      method: 'GET',
			      data: {
			        pinpai: this.pinpai,
			      }
			    }).then((res) => {
			      this.productlist = res.data.list;
			      this.productlist.sort(this.compare("goodrate", 1));
			      for (var i = 0; i < this.productlist.length; i++) {
			        var ai = this.productlist[i];
			        this.productnamelist1.push(ai.productname);
			        var change = parseInt(parseFloat(ai.goodrate) * 100);
			        this.goodratelist.push(change);
			        this.commnumlist1.push(ai.commnum);
			      }
			    
			      this.productlist.sort(this.compare("goodratefixed", 1));
			      for (var i = 0; i < this.productlist.length; i++) {
			        var ai = this.productlist[i];
			        this.productnamelist2.push(ai.productname);
			        var change = parseInt(parseFloat(ai.goodratefixed) * 100);
			        this.goodratefixedlist.push(change);
			        this.commnumlist2.push(ai.commnum);
			      }
			    
			      if (this.productlist.length === 0) {
			        this.printInfo = "列表为空";
			      }
				  console.log(this.productlist);
			      uni.hideLoading();
			      
			      this.$nextTick(() => {
			        this.drawa();
			      });
			    }).catch((error) => {
			      uni.hideLoading();
			      console.log(error);
			      uni.showModal({
			        content: '数据请求出错'
			      });
			    });
			  },
		}
	}
</script>

<style>
.page1{
	margin-top: -45rpx;
	height: 5000rpx;
	background-color: white;
}
</style>
