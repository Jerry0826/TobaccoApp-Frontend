<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue">
      <block slot="content">评论分析</block>
    </cu-custom>
    <view style="height: 20px;"></view>
	<view class="button-submit">
		<text style="font-size:18px; float: left;">请输入一段想分析的文本：</text>
		<button class="cu-btn bg-cyan lg" style="float: right;" @tap="analyse()">分析</button>
	</view>
    <view class="analyse-input">
		<textarea placeholder="请输入内容" style="border: 1px solid #ccc; width: 95%;"
		v-model="comment">
		</textarea>
	</view>
	<view style="float: left; align-items: end; font-size: 18px" v-if="score == 0" >
		您的输入不包含情感词
	</view>
		
  </view>
</template>


<script>
	export default {
		data() {
			return {
				comment: "",
				textLen: 0,
				judgement: false,
				score: -1,
				sentiment: "",
				posStatement: "",
				negStatement: "",
				results: [],
			}
		},
		methods: {
			analyse: function(){
				this.score = 0;
				var list = [];
				list.push(this.comment);
				//根据指定符号将句子分割成列表
				list = list.concat(
				this.comment
				  .replace(/[\s，,。.？?！!]+/g, " ") //g表示全文匹配
				  .trim()
				  .split(" ")
				);
				console.log(list);
				var reqList = [];
				//根据列表中的子句构造请求
				for (var i in list) {
				    reqList.push(uni.request({
				      url: "http://localhost:8000/api/analyze_comment?comment=" + list[i],
				      method: 'GET'
					}));
				}
				console.log(reqList);
				//同步发送多个请求（按list的顺序）
				this.results = []; //清空results
				Promise.all(reqList).then((res) => {
				    res.forEach((item, index) => {
				      if (index == 0) {
				        this.score = Math.round(item.data.result * 10000) / 100;
				      }
				      var score = Math.round(item.data.result * 10000) / 100;
				      var temp = [];
				      temp.push(item.data.comment);
				      temp.push(score);
				      this.results.push(temp);
				    });
				    console.log(this.results);
				  }).catch((error) => {
				    console.error(error);
				});
			}
		}
	}
</script>

<style>
.analyse-input{
	margin-left: 5px;
}
.button-submit {
	/* margin-left: 5px; */
	/* margin-top: 10px; */
  display: inline-block; /* 设置按钮为内联块元素 */
  width: 90%;
}
.cu-btn{
	height: 35px;
	margin-top: 0px;
	margin-right:0px;
}



</style>
