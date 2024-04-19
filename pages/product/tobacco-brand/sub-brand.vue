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
			<mrsongCharts type='column'  title="" align='left'>
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
	export default {
		data() {
			return {
				pinpai: '',
				score: '4',
				dataList: [
				                "味道",
				                "口感",
								"纯正",
								"价格",
								"包装",
								"便宜",
								"口粮",
								"回味",
								"味道",
								"口感",
								"纯正",
								"价格",
								"包装",
								"便宜",
								"口粮",
								"回味",
								"精品",
								"不错",
								"焦油",
								"烟嘴",
				            ],
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
			}
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
