<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue">
      <block slot="content">评论分析</block>
    </cu-custom>
    <view style="height: 20px;"></view>
    <text style="font-size:18px;">请输入一段想分析的文本：</text>
    <view class="analyse-input">
		<textarea placeholder="请输入内容" style="border: 1px solid #ccc; width: 95%;"></textarea>
	</view>
	<view class="button-submit"><button class="cu-btn bg-cyan lg" >分析</button></view>	
  </view>
</template>


<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.analyse-input{
	margin-left: 5px;
}
.button-submit {
	margin-left: 5px;
	margin-top: 10px;
  display: inline-block; /* 设置按钮为内联块元素 */
}

.button-submit button {
  font-size: 14px; /* 设置按钮字体大小 */
  padding: 3px 15px; /* 设置按钮内边距 */
  /* width: 20px; */
}

</style>
