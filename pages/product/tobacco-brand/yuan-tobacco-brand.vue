<template>
	<view>
		<h2 align="center" style="margin-top: 50rpx">
		      【{{ pinpai }}】品牌各规格好评率排行榜
		</h2>
		<view class="grid-item item1" style="margin-top: 20px">
		  <el-radio-group v-model="radio" @change="radioChange">
			<el-radio-button label="1">原始好评率</el-radio-button>
			<el-radio-button label="2">贝叶斯修正的好评率</el-radio-button>
		  </el-radio-group>
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
		
			drawa() {
			  var myChart = this.$echarts.init(document.getElementById("myChart"));
			  // var myChart = echarts.init(myChart);
			  var option1 = {
				color: "rgb(255,165,0)",
				grid: {
				  //调整图表位置
				  top: 0,
				  bottom: 0,
				  left: "17%", //左侧留白
				  right: "13%", //右侧留白
				},
				xAxis: {
				  type: "value",
				  show: false,
				  axisLine: { show: false },
				  splitLine: { show: false },
				  axisTick: { show: false },
				  max: 100, //设置最大值
				},
				yAxis: {
				  type: "category",
				  data: this.productnamelist1,
				  axisLabel: {
					fontSize: 12,
				  },
				  axisLine: { show: false },
				  axisTick: { show: false },
				},
				series: [
				  {
					data: this.goodratelist,
					type: "bar",
					barWidth: 30, // 柱图宽度
					// barMinWidth: 3, // 最小宽度
					// barMaxWidth: 50, // 最大宽度
					// barGap: 10,
					barCateGoryGap: "20%",
					itemStyle: {
					  //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
					  normal: {
						//柱形图圆角，初始化效果
						borderRadius: [0, 20, 20, 0],
					  },
					},
					showBackground: true,
					backgroundStyle: {
					  color: "rgba(180, 180, 180, 0.2)",
					},
					label: {
					  show: true,
					  formatter: (params) => {
						var idx = params.dataIndex;
						return (
						  params.value +
						  "%（" +
						  this.commnumlist1[idx] +
						  "条评论" +
						  "）"
						);
					  },
					  position: "right",
					  fontSize: 12,
					},
				  },
				],
			  };
			  myChart.clear();
			  myChart.setOption(option1);
			  //柱状图高度自适应
			  this.autoHeight = this.goodratelist.length * 50;
			  myChart.resize({ height: this.autoHeight });

			  var width = myChart.getWidth();
			  var opt = myChart.getOption();
			  var grid = opt.grid[0];

			  var left = grid.left;
			  left = (width * parseFloat(left)) / 100;
			  var right = grid.right;
			  right = (width * parseFloat(right)) / 100;

			  var x = width - left - right;

			  myChart.setOption({
				series: [
				  {
					label: {
					  show: true,
					  position: "left",
					  offset: [x + 135, 0],
					},
				  },
				],
			  });
			},

			drawb() {
			  var myChart = this.$echarts.init(document.getElementById("myChart"));
			  // var myChart = echarts.init(myChart);
			  var option2 = {
				color: "rgb(255,165,0)",

				grid: {
				  //调整图表位置
				  top: 0,
				  bottom: 0,
				  left: "17%", //左侧留白
				  right: "13%", //右侧留白
				},
				xAxis: {
				  type: "value",
				  show: false,
				  axisLine: { show: false },
				  splitLine: { show: false },
				  axisTick: { show: false },
				  max: 100, //设置最大值
				},
				yAxis: {
				  type: "category",
				  data: this.productnamelist2,
				  axisLabel: {
					fontSize: 12,
				  },
				  axisLine: { show: false },
				  axisTick: { show: false },
				},
				series: [
				  {
					data: this.goodratefixedlist,
					type: "bar",
					barWidth: 30, // 柱图宽度
					// barMinWidth: 3, // 最小宽度
					// barMaxWidth: 50, // 最大宽度
					// barGap: 10,
					barCateGoryGap: "20%",
					itemStyle: {
					  //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
					  normal: {
						//柱形图圆角，初始化效果
						borderRadius: [0, 20, 20, 0],
					  },
					},
					showBackground: true,
					backgroundStyle: {
					  color: "rgba(180, 180, 180, 0.2)",
					},
					label: {
					  show: true,
					  formatter: (params) => {
						var idx = params.dataIndex;
						return (
						  params.value +
						  "%（" +
						  this.commnumlist2[idx] +
						  "条评论" +
						  "）"
						);
					  },
					  position: "right",
					  fontSize: 12,
					},
				  },
				],
			  };
			  myChart.clear();
			  myChart.setOption(option2);
			  //柱状图高度自适应
			  this.autoHeight = this.goodratelist.length * 50;
			  myChart.resize({ height: this.autoHeight });

			  var width = myChart.getWidth();
			  var opt = myChart.getOption();
			  var grid = opt.grid[0];

			  var left = grid.left;
			  left = (width * parseFloat(left)) / 100;
			  var right = grid.right;
			  right = (width * parseFloat(right)) / 100;

			  var x = width - left - right;

			  myChart.setOption({
				series: [
				  {
					label: {
					  show: true,
					  position: "left",
					  offset: [x + 135, 0],
					},
				  },
				],
			  });
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

</style>
