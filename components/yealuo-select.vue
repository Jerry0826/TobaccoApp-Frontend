<template>
	<view class="yealuo-select" >
		<view class="yealuo-background" @tap="isShow=false" v-show="isShow"></view>
		<view class="yealuo-con" :style="inputStyle" @tap='isShow=isShow?false:nowData.length'>
			<slot name='left'></slot>
			<input :disabled="theDisabled" :placeholder="placeholder" v-model="theValue" @input="theInput"  @focus="theFocus" @blur="theBlur" autocomplete="off" />
			<slot name='right' v-if="selectIco">
				<svg class="icon" v-if="!isShow" style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="530"><path d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z" p-id="531"></path></svg>
				<svg class="icon" v-else style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1927"><path d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z" p-id="1928"></path></svg>
			</slot>
		</view>
		<view class="yealuo-select" v-show="show" :style="selectStyle">
			<view class="data">
				<radio-group v-if="checkType=='radio'"  @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index" >
					<label class="item-text" :class="{active: theValue==item.value}">
					<radio name="name1" checked v-if="theValue==item.value" :value="item.value+'|'+item.id"></radio>
					<radio name="name1" v-else :value="item.value+'|'+item.id"></radio>
					{{item.value}}
					</label>
				</view>
				</radio-group>
				<checkbox-group v-else-if="checkType=='checkbox'" @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index" >
					<label class="item-text" :class="{active: theValue.indexOf(item.value)!=-1 }">
					<checkbox name="name1" checked v-if="theValue.indexOf(item.value)!=-1 " :value="item.value+'|'+item.id"></checkbox>
					<checkbox name="name1" v-else :value="item.value+'|'+item.id"></checkbox>
					{{item.value}}
					</label>
				</view>
				</checkbox-group>
				<radio-group v-else  @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index" >
					<label class="item-text" :class="{active: theValue==item.value}">
					<radio name="name1" style="display: none;" checked v-if="theValue==item.value" :value="item.value+'|'+item.id"></radio>
					<radio name="name1" style="display: none;" v-else :value="item.value+'|'+item.id"></radio>
					{{item.value}}
					</label>
				</view>
				</radio-group>
			</view>
			<view class="item-close" @tap="isShow=false">收起</view>
		</view>
	</view>
</template>

<script>
	/**
	 * v1.0.0
	 * 最后修改: 2020.11.2
	 * 创建: 2020.9.30
	 * Author:yealuo.com
	 * contact:470797533@qq.com
	 */
	let fontUnit = 'upx'
	// #ifdef MP-WEIXIN
	fontUnit = 'rpx'
	// #endif
	export default {
		name: 'yealuoInputs',
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			checkType: {
				type: String,
				default: ''
			},
			itemKey: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '600'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			inputStyle: {
				type: String,
				default: ''
			},
			selectStyle: {
				type: String,
				default: ''
			},
			overflow: {
				type: String,
				default: 'auto'
			},
			tags: {
				type: String,
				default: ''
			},
			
			binData:{
				type:Array,
				default: ''
			},
			selectIco:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				odData:this.binData,
				nowData:this.binData,
				isShow: false,
				theValue: this.value,
				theDisabled: this.disabled
			}
		},
		// watch: {
		// 	value(val){
		// 		this.theValue = val;
		// 	},
		// 	//监听数据变化
		// 	nowData:{
		// 		handler:function(){
		// 		 this.nowData=this.binData;
		// 		},
		// 		deep:true
		// 	}
			
		// },
		watch: { 
			value(val){ 
				this.theValue = val; 
			}, 
		//监听数据变化 
			binData:{ handler:function(newVal, oldVal)
				{ 
				this.binData = newVal; 
				this.odData = newVal; 
				this.nowData = newVal; }, 
				deep:true } ,
		},
		computed: {
			show(){
				return this.isShow && this.nowData.length
			}
			
		},
		methods: {
			//获取焦点
			theFocus(e){
				this.nowData=this.odData;
			},
			//失去焦点
			theBlur(e){
				this.$emit('blur',e)
			},
			//获取输入值
			theInput(e) {
				var val=e.detail.value;
				let data = [];
				var odData=this.odData;
				for(var i=0;i<odData.length;i++){
					var isHas=false;
					if(odData[i].value.indexOf(val)!=-1){
						data.push(odData[i])
						if(odData[i].value==val){
							isHas=true;
							var arr=[];
							arr.push(odData[i].value+"|"+odData[i].id)
						  this.$emit('getBackVal',arr);
						}
					}
					if(!isHas){
						var arr=[];
						arr.push(val)
						 this.$emit('getBackVal',arr);
					}
				}
				this.nowData=data;
			},
			//下拉选中
			selectCheckbox(e){
				var val=e.target.value;
				var str=val;
				if(typeof(str)!="string"){
					str="";
					for(var i=0;i<val.length;i++){
						var vt=val[i].split("|");
						str+=i>0?","+vt[0]:vt[0];
					}
				}
				else{
					this.isShow = false;
					str=str.split("|")[0];
				}
				this.$emit('getBackVal',val+"|"+this.tags)
				this.theValue = str;
			}
		},
	}
</script>

<style lang="scss" scoped>
.yealuo-select{
	max-width: 100%;
	position: relative;
	.yealuo-background{position: fixed;top:0;left:0;width: 750upx;height: 100%;}
	.yealuo-con{display: flex;align-items: center;justify-content: center;
		input{flex: 1;margin: 0 6upx;}
	}
	
	.yealuo-select {
		border: 1px solid #f3f3f4;
		position: absolute;
		z-index: 999;
		background: #fff;
		width: 100%;
		.data{
			max-height: 600upx;
			padding: 10upx;
			overflow: auto;
			.select-item {width: 100%;color:#666;
				.item-text{ width:100%; display:block;}
				.active{font-weight: bold;}
			}
			.item-auto{overflow: auto;
				.item-text{width: max-content;}
			}
			.item-hide .item-text{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.item-close {
			padding: 20upx;
			text-align: center;
			font-size: 32upx;
			border-top: 1px solid #f3f3f4;
			color:#8F8F94;
		}
	}
}
</style>
