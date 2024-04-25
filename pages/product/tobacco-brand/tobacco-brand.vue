<template>
	<view class="page1">
		<h2 align="center" style="margin-top: 50rpx">
		      【{{ pinpai }}】品牌各规格好评率排行榜
		</h2>
		<view class="grid-item item1" style="margin-top: 20px">
		  <el-radio-group v-model="radio" @change="radioChange">
			<el-radio-button label="1"  @tap="showSorted()">原始好评率</el-radio-button>
			<el-radio-button label="2"  @tap="showReversed()">贝叶斯修正的好评率</el-radio-button>
		  </el-radio-group>
		</view>
		<view style="margin-top: 30rpx;"></view>
		<view class="flex" v-for="(item, index) in currentList" :key="index" @tap="gotobrand(item)" style="margin-top: 20rpx;">
			<text style="width: 200rpx;">{{ item.productname }}</text>
			<view class="cu-progress round striped active" style="margin-right: 30rpx;">
				<view class="bg-cyan" :style="{ width: loading ? (currentRate(item) * 100) + '%' : '' }">{{ Math.floor(currentRate(item) * 100) }}%</view>
			</view>
		</view>
		<!-- <view class="flex" v-for="(item,index) in sortedProductList" :key="index"
		@tap="gotobrand(item)" style="margin-top: 20rpx; ">
			<text  style="width: 200rpx;">{{sortedProductList[index].productname}}</text>
		    <view class="cu-progress round striped active" style="margin-right: 30rpx;"> -->
				<!-- <view class="bg-cyan" :style="[{ width:loading?  (sortedProductList[index].goodrate*100)+'%':''}]" >{{Math.floor(sortedProductList[index].goodrate*100)}}%</view>
		    </view>
		</view> -->
		
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
				productId: '',
				loading: false,
				showReversedList: true, // 控制是否显示1列表
				showSortedList: false, // 控制是否显示2列表
				showGoodRateValue: true, // 控制是否显示 item.goodrate
				pinpai: null,
				productlist: [],
				idList: [],
				rawdata: [],
				productnamelist1: [],
				productnamelist2: [],
				goodratelist: [],//好评率
				goodratefixedlist: [],
				commnumlist1: [],//评论数量
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
			 // 在页面加载时默认选中第一个按钮
			this.showSorted();
		},
		watch: {
			// 监视路由参数变化
			'$route.query.name'(newName) {
				this.name = newName;
			}
		},
		computed:{
			reversedProductList() {
			  // 返回 productlist 数组的倒序数组
			  return this.productlist.slice().reverse();
			},
			sortedProductList() {
			  // 按照 goodrate 属性进行排序
			  return this.productlist.slice().sort((a, b) => b.goodrate - a.goodrate);
			},
			currentList() {
			  // 根据按钮状态返回不同的列表
			  return this.showReversedList ? this.reversedProductList : this.sortedProductList;
			},
			
		},
		methods: {
			gotobrand: function(item){
				const itemName = item.productname; // 假设名字存储在元素的nameKey属性中
				console.log(itemName);
				http({
					url: '/get_rating',
					method: 'GET',
					data: {
					  productName: itemName,//注意，原型系统的后端是通过id来获取数据的，这里对后端进行了修改
					}
				}).then((res)=>{
					this.productId = res.data.productId;
					console.log(this.productId);  //因为sun-brand页面的细粒度筛选tabChange函数需要用到id
					const url = `/pages/product/tobacco-brand/sub-brand?id=${this.productId}&name=${itemName}`;
					console.log(url);
					uni.navigateTo({
						url: url ,
					})
				}).catch((error) => {
					console.error('Error:', error);
				  });
				  // 构建动态跳转路径，传递选中元素的名字作为参数
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
				// this.drawa();
				this.showSorted();
			  } else if (this.radio == 2) {
				console.log("changed");
				// this.drawb();
				this.showReversed();
			  }
			},
			//原始好评率
			showReversed() {
			  this.showReversedList = true;
			  this.showGoodRateValue = true;
			},
			//贝叶斯修正好评率
			showSorted() {
			  this.showReversedList = false;
			  this.showGoodRateValue = false;
			},
			currentRate(item) {
			  return this.showGoodRateValue ? item.goodratefixed : item.goodrate;
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
				  console.log("productlist:" );
				  console.log(this.productlist);
				  console.log("goodratelist");
				  console.log(this.productnamelist1);
			      uni.hideLoading();
			      
			      this.$nextTick(() => {
			        // this.drawa();
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
	height: 4500rpx;
	background-color: white;
}
</style>
