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
			 style="height: 240upx;padding: 18upx 16upx 8upx 16upx">
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
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view>
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view>
							<view class="cu-tag bg-red light sm round">正义天使</view>
							<view class="cu-tag bg-green light sm round">史诗</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
						description: '热门排行',
					},{
						id: 2,
						url: '/static/icon/3guigefenxi.png',
						description: '规格分析',
					},{
						id: 3,
						url: '/static/icon/4shoucangyanpin.png',
						description: '收藏烟品',
					}
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
				}
			}
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
	padding: 25px; /* 可根据需要调整 */
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
</style>
