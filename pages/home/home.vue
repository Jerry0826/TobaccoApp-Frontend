<template>
	<view class="index-content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">首页</block>
		</cu-custom>
		<view style="height: 15px;"></view>
		<!-- 搜索框 -->
		<view class="index-search" style="margin-right: 12upx;" @tap="toSearchIndex">
			<view class="icon_search" style="text-align: left;color: #999999;">
				<text class="cuIcon cuIcon-search" style="margin-right: 12upx"></text>
				<text>请输入搜索内容</text>
			</view>
		</view>
		<!-- 广告栏轮播 -->
		<view>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="2500" duration="500" 
			 style="height: 20px;padding: 18upx 16upx 8upx 16upx">
				<swiper-item v-for="(item,index) in swiperList" :key="index" 
				@tap="toIndex(item.id)">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
					<view class="swiper-description">{{ item.description }}</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 图标跳转 -->
		<view class="dots">
			<view v-for="(page,pageindex) in navlist" :key="pageindex" class="dot-item"
			@tap="toIconIndex(page.id)">
				<image :src="page.url" class="dot-icon"></image>
				<view class="dot-description">{{ page.description }}</view>
			</view>
		</view>
		<!-- 公告 -->
		<swiper :autoplay="true" :vertical="true" :interval="4000"
			:circular="true" :indicator-dots="false"
			style="height: 60upx; margin-top: 5px ;margin-left: 32upx;margin-right: 32upx;line-height: 60upx;background: #FFF0F1;border-radius: 32upx;">
			<block v-for="(item, index) in messageList" :key="index">
				<swiper-item >
					<view style="display: flex;">
						<image src="@/static/gonggao.png"
							style="width: 140upx;height: 38upx;margin:12upx 16upx;"></image>
						<view>{{ item.title }}</view>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<view style="background: #EDF1F7;height: 16upx;width: 100%;margin-top: 32upx;"></view>
		<!-- 卡片 -->
		<view v-for="(item,index) in cardlist" :key="index" @tap="toCardIndex(item.id)">
			<view class="cu-card article" :class="isCard?'no-card':''">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut">{{item.title}}</view></view>
					<view class="content">
						<image :src="item.img"
						 mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{item.content}}</view>
							<view>
								<view v-for="(tag,index) in item.taglist" :key="index" 
								class="cu-tag light sm round "
								:class="{'bg-red': tag.color === 'red', 'bg-green': tag.color === 'green'}">
									{{tag.tag}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="border-bottom: 0.1px solid rgba(0, 0, 0, 0.5);"></view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: [
					{title:"更新！北京市公共场所卫生安全条例"},
					{title:'国家烟草局发布重要通知'}
				],
				swiperList: [{
								id: 0,
								type: 'image',
								description: '在健康与尊重之间寻找平衡',
								url :'/static/swiper-pic/1.jpg',
							}, {
								id: 1,
								type: 'image',
								description: '“南京”（雨花石）真假烟鉴别要点速览！',
								url: '/static/swiper-pic/2.jpg',
							}, {
								id: 2,
								type: 'image',
								description: '卖烟不赚钱，那为何零售户都在卖烟？',
								url: '/static/swiper-pic/3.jpg'
				}],
				dotStyle: true,
				navlist:[{
						id: 0,
						url: '/static/icon/1yancaodaquan.png',
						description: '烟草大全',
					},{
						id: 1,
						url: '/static/icon/2remenpaihang.png',
						description: '近期热门',
					},{
						id: 2,
						url: '/static/icon/3guigefenxi.png',
						description: '规格分析',
					},{
						id: 3,
						url: '/static/icon/4shoucangyanpin.png',
						description: '收藏烟品',
					}
				],
				cardlist: [
					{
						id: 0,
						title: '从河北邯郸初中生遇害事件谈未成年人犯罪与烟草专卖执法的严格性'	,
						img: '/static/card/1.jpg',
						content: '河北邯郸市初中生王某某被害案件引起了社会广泛关注，也引发了人们对于犯罪分子的惩罚和执法部门的执行力度的观点和看法。',
						taglist: [
							{tag: '烟草', color: 'green'},
							{tag: '未成年', color: 'red'},
						]
					},{
						id: 1,
						title: '一场火车上的“烟雾战争'	,
						img: 'https://res.yanyue.cn/common/news/ctpics/202403/22/1711088031202980.png',
						content: '在这个快节奏的世界里，火车不仅是连接城市与城市之间的纽带，更是一个微缩的社会舞台。最近，一位女士在火车上的吸烟区上演了一出“独角戏”，引发了一场关于吸烟权利与非吸烟者权益的“烟雾战争”。',
						taglist: [
							{tag: '烟草', color: 'green'},
							{tag: '讨论', color: 'red'},
						]
					},{
						id: 1,
						title: '有一种想念，叫我想吸烟了'	,
						img: 'https://res1.yanyue.cn:5232/common/news/upctpics/202403/22/1711088848122524.jpg',
						content: '独在异乡为异客，每逢佳节倍思亲。这是刻在中国人骨子里的无法抹去的思乡思亲情结。',
						taglist: [
							{tag: '烟草', color: 'green'},
							{tag: '讨论', color: 'red'},
						]
					},
				]
			};
		},
		methods: {
			gotofac(){
				uni.navigateTo({
					url:'/pages/product/product-factory'
				})
			},
			toSearchIndex: function() {
				uni.navigateTo({
					url: '/pages/home/homesearch/homesearch'
				});
			},
			toIndex: function(itemid) {
				switch(itemid){
					case 0: 
						window.location.href ='https://www.yanyue.cn/news/4676';
						break;
					case 1:
						window.location.href ='https://www.yanyue.cn/news/4711';
						break;
					case 2:
						window.location.href ='https://www.yanyue.cn/news/4708';
						break;
				}
			},
			toIconIndex: function(pageid){
				switch(pageid){
					case 0:
						uni.navigateTo({
							url:'/pages/product/product-factory'
						})
						break;
					case 1:
						uni.navigateTo({
							url:'/pages/home/hot'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'/pages/home/hot'
						})
						break;
					case 3:
						uni.navigateTo({
							url:'/pages/home/hot'
						})
						break;
				}
			},
			toCardIndex: function(cardid){
				switch(cardid){
					case 0:
						window.location.href ='https://www.yanyue.cn/news/4708';
						break;
				}
			},
		}
	}
</script>

<style>
.index-content{
	width:100%;
	background-color:white;
}
.index-search  {
	background: #F6F6F6;
	border-radius: 40upx;
	-moz-border-radius: 40upx;
	-webkit-border-radius: 40upx;
	-o-border-radius: 40upx;
	-ms-border-radius: 40upx;
	height: 66upx;
	line-height: 66upx;
	font-size: 26upx;
	color: #dcdcdc;
	text-align: left;
	text-indent: 32upx;
	position: relative;
	z-index: 1;
	zoom: 1;
	transition: all .4s ease 0s;
	-o-transition: all .4s ease 0s;
	-moz-transition: all .4s ease 0s;
	-webkit-transition: all .4s ease 0s;
	transform-origin: center;
}
.swiper-description {
    position: absolute;
    left: 20upx;
    bottom: 40upx;
    color: #ffffff;
    font-size: 20px;
	/* text-shadow: -1upx -1upx 0 #000,  
	                 1upx -1upx 0 #000,  
	                 -1upx 1upx 0 #000,  
	                 1upx 1upx 0 #000; */
}
.dots{
	display: flex; /* 使用 Flex 布局 */
	justify-content: space-between; /* 图标之间均匀分布 */
	align-items: center; /* 垂直居中对齐 */
	padding: 20px; /* 可根据需要调整 */
	margin-top: -15px;
	margin-bottom: 10px;
}
.dot-item {
	width: 60px; /* 图标容器宽度 */
	height: 60px; /* 图标容器高度 */
	margin-right: 1px; /* 图标之间的间距，可根据需要调整 */
}
.dot-icon {
	width: 100%; /* 图标图片宽度填满容器 */
	height: 100%; /* 图标图片高度填满容器 */
	object-fit: contain; /* 图片等比缩放适应容器 */
}
.dot-description{
	margin-top:  -10px;
	margin-left: 4px;
}
.icon_search{
	
}
.cu-card{
	margin-top: -15px;
	height: 170px;
}
</style>
