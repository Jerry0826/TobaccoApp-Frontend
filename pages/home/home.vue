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
					<view class="description">{{ item.description }}</view>
				</swiper-item>
			</swiper>
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
							dotStyle: true
							};
		},
		methods: {
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
.description {
    position: absolute;
    left: 20upx;
    bottom: 20upx;
    color: #ffffff;
    font-size: 20px;
	/* text-shadow: -1upx -1upx 0 #000,  
	                 1upx -1upx 0 #000,  
	                 -1upx 1upx 0 #000,  
	                 1upx 1upx 0 #000; */
}

.icon_search{
	
}
</style>
