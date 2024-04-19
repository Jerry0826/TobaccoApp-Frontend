<template>
	<view class="tree_select_con">
		<view class="title_con" v-if="selfShowNav">
			<view class="cancel" @click="bindCancel">{{cancelText || cancel_text}}</view>
			<view class="title">{{title}}</view>
			<view class="confirm" @click="bindConfirm" :style="{'color':defaultActiveColor}">{{confirmText || confirm_text}}</view>
		</view>
		<view class="search_box" v-if="isSearch">
			<uni-easyinput v-model="search_key" :prefixIcon="'search'" :confirmType="'search'" :trim="'both'" :placeholder="searchPlaceholder" @input="bindInput" @confirm="bindSearch"/>
			<view class="search" @click="bindSearch" :style="{'background':defaultActiveColor}">{{searchText}}</view>
		</view>
		
		<view class="tree_select" v-if="items.length">
			<view class="select_l">
				<scroll-view scroll-y="true" >
					<template v-for="(item, ind) in items">
						<view class="item" :class="{'active':active_index==ind,'disabled':item.disabled}" :key="ind" @click="bindNav(ind)">
							<view class="br" :style="{'background':defaultActiveColor}"></view>
							<view class="txt">
								{{item.text}}
								<view class="dot" v-if="item.dot" :style="{'background':defaultActiveColor}"></view>
								<view class="badge" v-if="item.badge" :style="{'background':defaultActiveColor}">{{item.badge}}</view>
							</view>
						</view>
					</template>
				</scroll-view>
			</view>
			<view class="select_r">
				<scroll-view scroll-y="true" >
					<view class="item" v-if="selectAll" :class="{'active':select_all}" :style="{'color':select_all?defaultActiveColor:'initial'}"  @click="bindAll()">
						<view class="txt">
							全选
						</view>
						<view class="ic_con">
							<image class="icon" :src="selectedIcon" mode="mode" v-if="selectedIcon"></image>
							<uni-icons class="ic" :type="'checkmarkempty'" :size="20" :color="defaultActiveColor" v-else></uni-icons>
						</view>
					</view>
					<template v-for="(item,ind) in items[active_index].children">
						<!-- <view class="item disabled" v-if="item.disabled" @click="bindItem(ind, item)" :key="ind">
							<view class="txt">
								{{item.text}}
							</view>
							<view class="ic_con">
								<image class="icon" :src="selectedIcon" mode="mode" v-if="selectedIcon"></image>
								<view class="ic" v-else></view>
							</view>
						</view> -->
						<view class="item" :class="{'active':isHave(item.id), 'disabled':item.disabled}" :style="{'color':isHave(item.id)?defaultActiveColor:'initial'}" @click="bindItem(ind, item)" :key="ind">
							<view class="txt">
								{{item.text}}
							</view>
							<view class="ic_con">
								<image class="icon" :src="selectedIcon" mode="mode" v-if="selectedIcon"></image>
								<uni-icons class="ic" :type="'checkmarkempty'" :size="20" :color="defaultActiveColor" v-else></uni-icons>
							</view>
						</view>
					</template>
				</scroll-view>
			</view>
			<view class="search_result" v-if="isSearch" :style="{'height': search_height}">
				<scroll-view scroll-y="true" >
					<template v-if="search_list.length">
						<view class="search_list">
							<view class="item" :class="{'active':isHave(item.id),'disabled':item.disabled}" v-for="(item, ind) in search_list" :key="ind" :style="{'color':isHave(item.id)?defaultActiveColor:'initial'}" @click="bindItem(ind, item)">
								<view class="txt">{{item.all_text}}</view>
								<view class="ic_con">
									<image class="icon" :src="selectedIcon" mode="mode" v-if="selectedIcon"></image>
									<uni-icons class="ic" :type="'checkmarkempty'" :size="20" :color="defaultActiveColor" v-else></uni-icons>
								</view>
							</view>
						</view>
						<view class="close_btn" :style="{'background':defaultActiveColor}" @click="bindClose">关闭</view>
					</template>
					<template v-else>
						<view class="empty">
							<view class="txt">暂无相关数据</view>
							<view class="close" :style="{'background':defaultActiveColor}" @click="bindClose">关闭</view>
						</view>
					</template>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"wyh-tree-select",
		props: {
			showNav: {
				type: Boolean,
				default: false
			},
			defaultActiveColor: {
				type: String,
				default: '#FC2A57'
			},
			title: {
				type: String,
				default: '标题'
			},
			cancel_text: {
				type: String,
				default: '取消'
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirm_text: {
				type: String,
				default: '确认'
			},
			confirmText: {
				type: String,
				default: '确认'
			},
			// 分类显示所需的数据
			items: {
				type: Array,
				default () {
					return []
				}
			},
			// 左侧选中项的索引
			activeIndex: {
				type: Number | String,
				default: 0
			},
			// 右侧选中项的 id，支持传入数组
			activeIds: {
				type: Array,
				default (){
					return []
				}
			},
			// 右侧项最大选中个数
			max: {
				type: Number,
				default: 0
			},
			// 自定义右侧栏选中状态的图标
			selectedIcon: {
				type: String,
				default: ''
			},
			// 是否支持全选
			selectAll: {
				type: Boolean,
				default: false
			},
			// 是否支持搜索
			isSearch: {
				type: Boolean,
				default: false
			},
			searchPlaceholder: {
				type: String,
				default: '请输入关键词'
			},
			searchText: {
				type: String,
				default: '搜索'
			}
		},
		data() {
			return {
				list: this.items,
				active_index: this.activeIndex,
				active_ids: this.activeIds,
				select_all: false,
				search_key: '',		//搜索关键词
				search_list: [],	//搜索结果列表
				search_height: 0
			};
		},
		watch: {
			activeIds(val) {
				this.active_ids = val;
			}
		},
		computed: {
			selfShowNav() {
				if(this.showNav) {
					let arr = [].concat(this.activeIds);
					this.active_ids = arr;
				}
				return this.showNav;
			}
		},
		methods: {
			// 确认
			bindConfirm() {
				let that = this;
				let result = [];
				this.items.map(function (item, ind) {
					item.children.map(function (it, index) {
						that.active_ids.map(function (id, i) {
							if(it.id == id) {
								result.push(it);
							}
						})
					})
				})
				this.$emit('clickConfirm', result);
			},
			// 全选
			bindAll() {
				let that = this;
				let ind = this.active_index;
				if(this.select_all) {
					this.items[ind].children.map(function(item,index) {
						if( that.isHave(item.id) ) {
							let index = that.active_ids.indexOf(item.id);
							that.active_ids.splice(index, 1);
						}
					})
				} else {
					this.items[ind].children.map(function(item,index) {
						let ind = that.active_ids.indexOf(item.id);
						if(!item.disabled && ind == -1) {
							that.active_ids.push(item.id);
						}
					})
				}
				// console.log(this.active_ids);
				this.select_all = !this.select_all;
				this.initBadge();
			},
			// 取消
			bindCancel() {
				this.$emit('clickCancel');
			},
			// 左侧点击
			bindNav(ind) {
				if(!this.items[ind].disabled) {
					this.active_index = ind;
					if(this.selectAll) {
						this.select_all = this.isAll();
					}
				}
				this.$emit('clickNav', ind);
			},
			// 右侧点击
			bindItem(ind,item) {
				if(item.disabled) {
					return this.$emit('clickItem', item);			
				}
				if(this.max == 1) {
					// 单选
					this.$set(this.active_ids, 0, item.id);
				} else {
					if(this.isHave(item.id)) {
						let index = this.active_ids.indexOf(item.id);
						this.active_ids.splice(index, 1);
						// console.log(this.activeIds);
					} else if(this.max > 0 && !(this.active_ids.length < this.max)) {
						uni.showToast({
						    title: '最大选中数为'+this.max,
						    duration: 2000,
							icon: 'none'
						});
					} else {
						this.active_ids.push(item.id);
						// console.log(this.activeIds);
					}
				}
				// 全选
				if (this.selectAll) {
					this.select_all = this.isAll();
				}
				this.initBadge();
				this.$emit('clickItem', item);
			},
			// 是否已经选中
			isHave(id) {
				if(this.active_ids.indexOf(id) == -1) {
					return false;
				} else {
					return true;
				}
			},
			// 判断是否全选
			isAll() {
				let that = this;
				let len = 0;
				let len2 = 0;
				let _ind = this.active_index;
				this.items[_ind].children.map(function (item, index) {
					if(!item.disabled) {
						len += 1;
					}
					if(that.isHave(item.id)) {
						len2 += 1;
					}
				})
				if(len == len2 && len > 0) {
					return true;
				} else {
					return false;
				}
			},
			// 计算徽标
			initBadge() {
				let that = this;
				let ind = this.active_index;
				if(this.list[ind].badge !== undefined) {
					// 数字徽标
				}
				if(this.list[ind].dot !== undefined) {
					// 圆点徽标
				}
				this.list.map(function (item, index) {
					if(item.badge !== undefined) {
						item.badge = 0;
						item.children.map(function (child, key) {
							if(that.isHave(child.id)) {
								item.badge += 1;
							}
						})
					} 
					if(item.dot !== undefined) {
						item.dot = false;
						item.children.map(function (child, key) {
							if(that.isHave(child.id)) {
								item.dot = true;
							}
						})
					}
				})
				// console.log(this.list);
			},
			// 输入
			bindInput() {
				if(!this.search_key) {
					this.search_height = 0;
					this.search_list = [];
				}
			},
			bindClose() {
				this.search_key = '';
				this.search_height = 0;
				this.search_list = [];
			},
			// 搜索
			bindSearch() {
				let that = this;
				if(!this.search_key) {
					uni.showToast({
						title: '请输入关键词',
						icon: 'none'
					});
					return false;
				}
				this.search_height = '100%';
				this.search_list = [];
				this.list.map(function (item, index) {
					if(!item.disabled) {
						item.children.map(function (child, key) {
							if(child.text.indexOf(that.search_key) !== -1) {
								child.all_text = `${item.text} -- ${child.text}`;
								that.search_list.push(child);
							}
						})
					}
				})
				// console.log(this.search_list);
			}
		},
		created() {
			this.initBadge();
			if(this.selectAll) {
				this.select_all = this.isAll();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tree_select_con {
		.title_con {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			background: #ffffff;
			color: #333333;
			border-radius: 30rpx 30rpx 0 0;
			.title {
				font-size: 30rpx;
				font-weight: 700;
			}
			.cancel {
				color: #999999;
				padding: 20rpx;
				font-size: 28rpx;
			}
			.confirm {
				padding: 20rpx;
				font-size: 28rpx;
			}
		}
		.search_box {
			display: flex;
			padding: 20rpx;
			background: #fff;
			.search {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				font-weight: 700;
				color: #fff;
				padding: 0 30rpx;
				border-radius: 10rpx;
				margin-left: 20rpx;
				letter-spacing: 2px;
			}
		}
		.tree_select {
			position: relative;
			display: flex;
			height: 600rpx;
			overflow: hidden;
			background: #ffffff;
			color: #333333;
			scroll-view {
				height: 600rpx;
			}
			.select_l {
				flex: 1;
				background: #F4F4F4;
				overflow: hidden;
				.item {
					padding: 20rpx;
					font-size: 30rpx;
					position: relative;
					display: flex;
					align-items: center;
					.txt {
						display: flex;
						align-items: center;
						position: relative;
						.dot {
							position: absolute;
							top: -15rpx;
							left: 100%;
							width: 14rpx;
							height: 14rpx;
							border-radius: 7rpx;
						}
						.badge {
							position: absolute;
							top: -15rpx;
							left: 100%;
							padding: 0 10rpx;
							border-radius: 50rpx;
							font-size: 24rpx;
							color: #ffffff;
						}
					}
					.br {
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						width: 4rpx;
						opacity: 0;
					}
					&.active {
						background: #ffffff;
						.br {
							opacity: 1;
						}
					}
					&.disabled {
						color: #aaaaaa;
						cursor: not-allowed;
					}
				}
			}
			.select_r {
				flex: 2;
				overflow: hidden;
				.item {
					padding: 20rpx;
					font-size: 30rpx;
					font-weight: 700;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.ic_con {
						width: 40rpx;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.ic {
						opacity: 0;
						font-weight: initial;
					}
					.icon {
						width: 36rpx;
						height: 36rpx;
						opacity: 0;
					}
					&.active {
						.ic {
							opacity: 1;
						}
						.icon {
							opacity: 1;
						}
					}
					&.disabled {
						color: #aaaaaa !important;
						cursor: not-allowed;
					}
				}
			}
			.search_result {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				background: #fff;
				box-sizing: border-box;
				transition: all 0.3s;
				overflow: hidden;
				.search_list {
					padding-bottom: 90rpx;
					.item {
						padding: 15rpx 20rpx;
						font-size: 30rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.ic_con {
							width: 40rpx;
							height: 40rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.ic {
							opacity: 0;
							font-weight: initial;
						}
						.icon {
							width: 36rpx;
							height: 36rpx;
							opacity: 0;
						}
						&.active {
							.ic {
								opacity: 1;
							}
							.icon {
								opacity: 1;
							}
						}
						&.disabled {
							color: #aaaaaa !important;
							cursor: not-allowed;
						}
					}
				}
				.close_btn {
					position: fixed;
					bottom: 10rpx;
					left: 25%;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50%;
					height: 70rpx;
					border-radius: 35rpx;
					font-size: 30rpx;
					color: #fff;
					letter-spacing: 4px;
					box-shadow: 1px 4px 4px rgba(252,42,87,0.3);
				}
				.empty {
					display: flex;
					flex-flow: column;
					align-items: center;
					justify-content: center;
					.txt {
						font-size: 40rpx;
						color: #bbb;
						margin: 100rpx 0;
					}
					.close {
						color: #fff;
						margin: 0 auto;
						padding: 15rpx 40rpx;
						border-radius: 10rpx;
						letter-spacing: 2px;
						font-size: 30rpx;
					}
				}
			}
		}
	}
</style>
