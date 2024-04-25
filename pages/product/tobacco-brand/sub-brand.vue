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
<!-- 		<view class="comments">
			<view class="title-bar"> 
				<view class="title">
					<h3 style="margin-top: -50rpx;">消费者评价：</h3>
				</view>
				<view class="jump" @click="jumpToCommentsPage()">
					<text>>>更多评论</text>
				</view>
			</view>
			
		</view> -->
		<!-- 原型系统评论展示区 -->
		<view class="comments">
			<view >
				<h3>消费者评价：</h3>
		
				<el-radio-group
					v-model="tag"
					style="margin-top: 10px"
					@change="tagChange"
				>
					<el-radio label="-1">全部({{ allComments.length }})</el-radio>
					<el-radio label="0" v-if="textureTagNum > 0"
					  >口感{{ textureTag }}({{ textureTagNum }})</el-radio
					>
					<el-radio label="1" v-if="tasteTagNum > 0"
					  >烟味{{ tasteTag }}({{ tasteTagNum }})</el-radio
					>
					<el-radio label="2" v-if="priceTagNum > 0"
					  >价格{{ priceTag }}({{ priceTagNum }})</el-radio
					>
					<el-radio label="3" v-if="packageTagNum > 0"
					  >包装{{ packageTag }}({{ packageTagNum }})</el-radio
					>
					<el-radio label="4" v-if="qualityTagNum > 0"
					  >品质{{ qualityTag }}({{ qualityTagNum }})</el-radio
					>
					<el-radio label="5" v-if="flag === 1"
					  >燃烧{{ burnTag }}({{ burnTagNum }})</el-radio
					>
				</el-radio-group>
		
				<el-radio-group v-model="senti" @change="sentiChange" class="grid-container">
					<el-radio-button label="3">全部</el-radio-button>
					<el-radio-button label="0"
					  >差评({{ badComments.length }})</el-radio-button
					>
					<el-radio-button label="1"
					  >中评({{ neutralComments.length }})</el-radio-button
					>
					<el-radio-button label="2"
					  >好评({{ goodComments.length }})</el-radio-button
					>
				</el-radio-group>
			</view>
		
			<view >
				<piaoyi-comment-list :apprises="formattedApprises"></piaoyi-comment-list>
			</view>
		
			<view style="text-align: left; padding: 0px">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:pager-count="3"
					:page-sizes="[10, 20, 50, 100]"
					:page-size="currentSize"
					layout="sizes, prev, pager, next"
					:total="commentsNum"
				>
				</el-pagination>
			</view>
		</view>
		<!--  -->
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
							data: []
						},
						{
							name: '好评数',
							data: []
						}
					],
				},
				pinpai: '',
				score: '',
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
				currentSize: 10,
				commentsNum: 1,

				data: [],
				flag: 1,
				
				chartsData: [], //柱状图数据
				apprises: [{
				                    name: '', //昵称
				                    commentDate: '', //时间
				                    teachLevel: '', //描述简介
				                },]
			}
		},
		created() {
		  // 在组件创建时获取查询参数
		  this.pinpai = this.$route.query.name;
		  this.productid = this.$route.query.id;
		  http({
			url: '/get_rating',
			method: 'GET',
			data: {
			  productName: this.pinpai,//注意，原型系统的后端是通过id来获取数据的，这里对后端进行了修改
			}
		  }).then((res) => {
			// console.log(res);
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
			// this.getComments();
		  }).catch((error) => {
			console.error('Error:', error);
		  });
		},
		mounted(){
			// this.formatComments();
		},
		computed: {
		    filComments() {
		      return this.commentsToShow.slice(
		        (this.currentPage - 1) * this.currentSize,
		        this.currentPage * this.currentSize
		      );
		    },
			formattedApprises() {
			      // 将filComments中的数据格式化为<piaoyi-comment-list>需要的结构
			      return this.filComments.map(comment => ({
			        name: comment.authorname, // 昵称
			        commentDate: comment.commentdate, // 时间
			        teachLevel: comment.content, // 描述简介，这里假设你希望将内容作为描述简介
			        // 如果需要其他字段，可以继续添加
			      }));
			    },
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
						// console.log("111goodnumlist每一年的好评数量");
						// console.log(this.goodnumList);
						// console.log("222评论数总量");
						// console.log(this.commnumList);
						this.newChartsData.series[0].data = this.commnumList;
						this.newChartsData.series[1].data = this.goodnumList;
						// console.log( this.commentsToShow);
				        this.$nextTick(() => {
				          // this.formatComments();
				        });
				      });
			},
			formatComments() {
			    // 确保只处理前四个评论
			    const commentsToFormat = this.commentsToShow.slice(0, 6);
				console.log(commentsToFormat);
			    // 将处理后的评论赋值给apprises
			    this.apprises = commentsToFormat.map(comment => ({
			      name: comment.authorname,
			      commentDate: comment.commentdate,
			      // 假设你想将某个字段赋值给teachLevel，这里需要替换为正确的字段名
			      teachLevel: comment.content,
			    }));
			  },
			
			//实现分页相关方法
			handleSizeChange(newSize) {
			  this.currentSize = newSize;
			},
			handleCurrentChange(newPage) {
			  this.currentPage = newPage;
			},
			//粗粒度标签切换
			sentiChange() {
			  this.tag = "-1";
			  if (this.senti === "3") this.commentsToShow = this.allComments;
			  else if (this.senti === "2") this.commentsToShow = this.goodComments;
			  else if (this.senti === "1") this.commentsToShow = this.neutralComments;
			  else if (this.senti === "0") this.commentsToShow = this.badComments;
			  this.commentsNum = this.commentsToShow.length;
			  this.currentPage = 1;
			},
			//细粒度标签切换
			tagChange(label) {
			  this.senti = 3; //单选框复位至“全部”
			  if (label != -1) {
				http({
					url: '/show_comments_via_tag',
					method: 'GET',
					data:{
						productId: this.productid,
						tagIndex: label,
						degree: this.tagData[label].degree,
					}
				})
				  .then((res) => {
					console.log(res);
					this.commentsToShow = res.data.list;
					this.commentsNum = this.commentsToShow.length;
					this.currentPage = 1;
				  });
			  } else {
				this.commentsToShow = this.allComments;
				this.commentsNum = this.commentsToShow.length;
			  }
			},
			drawChart(){
				
			},
		},
		
		components:{liuPhotoWall,htzRate,mrsongCharts,piaoyiCommentList},
	}
</script>

<style>
.div1{
	height: 4800rpx;
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
.comments{
	margin-top: -90rpx;
}
.grid-container{
	margin-top: 20rpx;
	margin-bottom: 10rpx;
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
