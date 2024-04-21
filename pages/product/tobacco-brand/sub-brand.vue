<template>
	<view class="div1">
		<h2>{{pinpai}}</h2>
		<view style="margin-top: 20rpx;"></view>
		<h3>消费者评分：</h3>
		<view class="htz-item">
			<htz-rate v-model="score" :readonly='true'></htz-rate>
			<view class="htz-item-msg">当前评分:{{score}}分</view>
		</view>
		<view class="wall">
			<h3>消费者看法：</h3>
			<liu-photo-wall :dataList="dataList" @change="change"></liu-photo-wall>
		</view>
		<view class="mrsongcharts">
			<h3 style="margin-bottom: -50rpx;">产品评价随时间变化：</h3>
			<mrsongCharts type='column' :charts-data="newChartsData" title="" align='left'>
			</mrsongCharts>
		</view>
		<view class="comments">
			<view class="title-bar"> 
				<view class="title">
					<h3 style="margin-top: -50rpx;">消费者评价：</h3>
				</view>
				<view class="jump" @click="jumpToCommentsPage()">
					<text>>>更多评论</text>
				</view>
			</view>
			<piaoyi-comment-list :apprises="apprises"></piaoyi-comment-list>
		</view>
	</view>
</template>

<script>
import liuPhotoWall from '@/components/liu-photo-wall/liu-photo-wall.vue';
import htzRate from '@/components/htz-rate/htz-rate.vue';
import mrsongCharts from '@/components/mrsong-charts/mrsong-charts.vue';
import piaoyiCommentList from '@/components/piaoyi-commentList/piaoyi-commentList.vue';
import {http} from "../../../utils/request.js";

const textureDegreeOptions = ["差劲", "一般", "不错"];
const tasteDegreeOptions = ["较差", "一般", "很好"];
const priceDegreeOptions = ["昂贵", "还行", "实惠"];
const packageDegreeOptions = ["难看", "普通", "好看"];
const qualityDegreeOptions = ["较差", "一般", "好"];
const burnDegreeOptions = ["过快", "适当"];

	export default {
		data() {
			return {
				newChartsData:{
					categories: ['2008', '2009', '2010','2011', '2012', '2013','2014', '2015','2016', '2017', '2018', '2019', '2020'],
					series: [
						{
							name: '评论数',
							data: [7, 127, 96, 121, 103, 52,37,56,61,37,11,12,3]
						},
						{
							name: '好评数',
							data: [18, 80, 51, 89, 65, 28, 20, 25, 24, 18, 5, 3, 0]
						}
					],
				},
				pinpai: '',
				score: '4',
				productId: '',
				wordList: [],
				dataList: [],  //词云图数据
				productName: "",
				rating: "",
				comparison: [], //常被比较的规格
				compIdList: [],
				commyearList: [],
				commnumList: [],
				goodnumList: [],
				notgoodnumList: [],

				tag: "-1",
				tagData: [],
				textureTag: "",
				textureTagNum: 0,
				tasteTag: "",
				tasteTagNum: 0,
				priceTag: "",
				priceTagNum: 0,
				packageTag: "",
				packageTagNum: 0,
				qualityTag: "",
				qualityTagNum: 0,
				burnTag: "",
				burnTagNum: 0,

				senti: "3", //情感信息，-1表示sentiment为空
				commentsToShow: [], //评论总体
				allComments: [],
				goodComments: [], //好评
				neutralComments: [], //中评
				badComments: [], //差评

				currentPage: 1,
				currentSize: 20,
				commentsNum: 1,

				data: [],
				flag: 1,
				
				chartsData: [], //柱状图数据
				apprises: [{
				                    avatarUrl: '', //头像
				                    name: '单挑猫的老鼠', //昵称
				                    commentStar: 4, //评分
				                    commentDate: '2020-05-24', //时间
				                    teachLevel: '本人并不是很喜欢，总觉的口味平平', //描述简介
				                    appraises: ['口味'] // 标签
				                },{
				                    avatarUrl: '',
				                    name: 'Harln123',
				                    commentStar: 4,
				                    commentDate: '2020-05-01',
				                    teachLevel: '烟气很薄，抽到嘴里气太容易散了，味道很清香，余味不错。但很失望，没有传的那么好抽。',
				                    appraises: ['味道','余味' ]
				                }, {
				                    avatarUrl: '',
				                    name: 'sunny999',
				                    commentStar: 3,
				                    commentDate: '2020-02-01',
				                    teachLevel: '回南京过年，在超市买了一包。对这个烟的印象还是在小时候。我父亲一天两包软玉溪，偶尔抽软云，大红色的外观留下很深刻的印象。2015年后买过几次，对这个烟的印象一直不太好了。这个价位可以选择的有很多，我想这也是我最后一次买软云。呛喉，压肺，入喉不顺，后劲不足，烟气也杂，一包烟夹着其他三包烟抽完的。如果是假的不可能这几年买的都假。很遗憾吧！',
				                    appraises: ['呛喉','压肺','后劲不足', ]
				                },{
				                    avatarUrl: '',
				                    name: 'qq5dccd02b8705a',
				                    commentStar: 5,
				                    commentDate: '2020-01-23',
				                    teachLevel: '很经典！柔中带刚，刚中带柔，软硬适中。味道醇厚，30元以内最顺口',
				                    appraises: ['味道', ]
				                },{
				                    avatarUrl: '',
				                    name: '天之道理而不害',
				                    commentStar: 5,
				                    commentDate: '2020-01-23',
				                    teachLevel: '姐夫去云南出差带回来的。味道不错！烟草本香很猛。跟软玉溪不相伯仲吧',
				                    appraises: ['味道',]
				                }, {
				                    avatarUrl: '',
				                    name: '江苏小烟',
				                    commentStar: 3,
				                    commentDate: '2019-07-03',
				                    teachLevel: '慕名买的，感觉抽大口晕，烟味不浓，烟气容易散，抽完嘴里味道差',
				                    appraises: ['烟味不浓',]
				                }]
			}
		},
		created() {
		  // 在组件创建时获取查询参数
		  this.pinpai = this.$route.query.name;
		  http({
			url: '/get_rating',
			method: 'GET',
			data: {
			  productName: this.pinpai,//注意，原型系统的后端是通过id来获取数据的，这里对后端进行了修改
			}
		  }).then((res) => {
			console.log(res);
			this.productId = res.data.productId;
			this.score = res.data.rating / 2;
			// Promise链，在第一个请求成功后，触发第二个请求
			return http({
			  url: '/show_word_cloud',
			  method: 'GET',
			  data: {
				productId: this.productId,
			  }
			});
		  }).then((res) => {
			// console.log(res);
			this.wordList = res.data.list;
			// for(var i=0;i<this.wordList.length;i++){this.dataList[i] = this.wordList[i].name;}
			// for循环的执行是同步的，而上面的请求是异步的，无法完成词云图数据的正常显示
			this.dataList = this.wordList.map(item => item.name);//存放评价词
			
			this.getRatingByTime();
		  }).catch((error) => {
			console.error('Error:', error);
		  });
		},

		methods: {
			change(e) {
			            console.log('==========', e)
			},
			jumpToCommentsPage() {
			  // 在这里实现跳转到新页面的逻辑
			  uni.navigateTo({
			  	url: '/pages/product/tobacco-brand/comments',
			  })
			},
			getRatingByTime(){
				http({
							url: '/show_comments',
							method: 'GET',
							data: {
							  productId: this.productId,
							}
				      })
				      .then((res) => {
				        this.allComments = res.data.list;
				        this.tagData = res.data.tag_data;
				        this.commyearList = res.data.comm_year;
				        this.commnumList = res.data.comm_num;
				        this.goodnumList = res.data.good_num;
				        this.notgoodnumList = res.data.not_good_num;
				
				        this.textureTag = textureDegreeOptions[this.tagData[0].degree];
				        this.textureTagNum = this.tagData[0].num;
				        this.tasteTag = tasteDegreeOptions[this.tagData[1].degree];
				        this.tasteTagNum = this.tagData[1].num;
				        this.priceTag = priceDegreeOptions[this.tagData[2].degree];
				        this.priceTagNum = this.tagData[2].num;
				        this.packageTag = packageDegreeOptions[this.tagData[3].degree];
				        this.packageTagNum = this.tagData[3].num;
				        this.qualityTag = qualityDegreeOptions[this.tagData[4].degree];
				        this.qualityTagNum = this.tagData[4].num;
				        this.burnTag = burnDegreeOptions[this.tagData[5].degree];
				        this.burnTagNum = this.tagData[5].num;
				        this.flag = this.tagData[5].showBurn;
				
				        for (var i in this.allComments) {
				          //存在sentiment为空的评论
				          if (this.allComments[i].sentiment == "2")
				            this.goodComments.push(this.allComments[i]);
				          if (this.allComments[i].sentiment == "1")
				            this.neutralComments.push(this.allComments[i]);
				          if (this.allComments[i].sentiment == "0")
				            this.badComments.push(this.allComments[i]);
				        }
				        this.commentsToShow = this.allComments;
				        this.commentsNum = this.commentsToShow.length;
						console.log("111goodnumlist每一年的好评数量");
						console.log(this.goodnumList);
						console.log("222评论数总量");
						console.log(this.commnumList);
						// this.chartsData.series[0].data = this.commnumList;
						// this.chartsData.series[1].data = this.goodnumList;
						console.log(this.chartsData);
				        this.$nextTick(() => {
				          // this.drawChart();
				        });
				      });
			},
			drawChart(){
				
			},
		},
		
		components:{liuPhotoWall,htzRate,mrsongCharts,piaoyiCommentList},
	}
</script>

<style>
.div1{
	height: 3500rpx;
	background-color: white;
}
.htz-title {
	font-weight: bold;
	font-size: 30rpx;
	margin-bottom: 30rpx;
}

.htz-item {
	border-bottom: 1px dashed #D9D9D9;
	padding-bottom: 15rpx;
	margin-bottom: 15rpx;
}

.htz-item-msg {
	margin: 15rpx 0 0;
	font-size: 30rpx;
}
.wall{
	height: 400rpx;
}
.mrsongcharts{
	margin-top: 0rpx;
}
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  flex: 1;
}

.jump{
	margin-top: -10rpx;
  padding: 5px 10px;
  background-color: #aaaa7f;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
