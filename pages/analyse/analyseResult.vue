<template>
  <view class="div3">
    <view style="width: 800rpx; margin: 0 auto">
      <view style="padding: 15rpx; font-size: 35rpx">SnowNLP分析结果：</view>

      <view>
        <view style="display: flex; justify-content: center; align-items: center">
          <text>情感偏{{ sentiment }}</text>
        </view>
        <view
          style="
            margin: 0 auto;
            display: grid;
            align-items: center;
            font-weight: bold;
          "
        >
          <view style="grid-column: 1 / span 1; place-self: end">
            <uni-icons type="hand-up" size="40" color="#409eff"></uni-icons>
          </view>

          <el-progress
			  :text-inside="true"
			  :stroke-width="26"
			  :percentage="results[0][1] - 0"
			  define-back-color="#32cd32"
			  style="grid-column: 2 / span 3"
			></el-progress>
          <view style="grid-column: 5 / span 1; place-self: start">
            <uni-icons type="hand-down" size="40" color="#32cd32"></uni-icons>
          </view>
        </view>
      </view>
      <view class="commentsBox" v-if="posList.length > 0">
        <view class="comments1">正向评价：</view>
        <view class="result">
          <view class="comments2" v-for="(item, index) in posList" :key="index">{{ item }}</view>
        </view>
      </view>
      <view class="commentsBox" v-if="negList.length > 0">
        <view class="comments1">负向评价：</view>
        <view class="result">
          <view class="comments2" v-for="(item, index) in negList" :key="index">{{ item }}</view>
        </view>
      </view>
      <view>{{ bertLabels }}</view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';
import * as echarts from "echarts";
export default {
  data() {
    return {
      sentiment: "",
      posList: [],
      negList: [],
    };
  },
  props: ["results", "bertLabels"],
  created() {
    console.log(this.results);
    for (let i = 0; i < this.results.length; i++) {
      this.results[i][0] = this.results[i][0] + " | ";
      if (this.results[i][1] >= 50) {
        if (i === 0) {
          this.sentiment = "正向";
        } else {
          this.posList.push(this.results[i][0]);
        }
      } else if (this.results[i][1] > 0) {
        if (i === 0) {
          this.sentiment = "负向";
        } else {
          this.negList.push(this.results[i][0]);
        }
      }
    }
    if (this.posList.length > 0) {
      let str = this.posList[this.posList.length - 1];
      this.posList[this.posList.length - 1] = str.substr(0, str.length - 3);
    }
    if (this.negList.length > 0) {
      let str = this.negList[this.negList.length - 1];
      this.negList[this.negList.length - 1] = str.substr(0, str.length - 3);
    }
  },
};
</script>

<style>
.commentsBox{
	font-size: 35rpx;
	padding: 10rpx;
}
.el-progress-bar > view {
  background-color: #32cd32;
}
</style>
