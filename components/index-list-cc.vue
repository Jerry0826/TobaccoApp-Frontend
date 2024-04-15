<template>
  <view class="indexed-list-cc">
	<view class="search-container">
		<view class="search-box">
			<slot name="search">
				<input class="input search-default" type="text" v-model="keyword" placeholder="请输入搜索信息"/>
			</slot>
		</view>
		<view class="close-src" @tap="search-product">
			<button class="cu-btn round bg-cyan shadow">搜索</button>
		</view>
	</view>
    <view class="indexed-list-box">
      <view v-for="(itemMap, index) in indexedMap" :key="index" :id="itemMap.index.length > 0 ? ('index_' + itemMap.index.replace('#', 'end')): index"
            class="indexed-list-item-box">
		<!-- headermap -->
        <view v-if="itemMap.index.length > 0" class="indexed-head-box">
          <slot name="head" :index="itemMap.index">
            <view class="indexed-head-title">{{ itemMap.index }}</view>
          </slot>
        </view>
		<!-- 数据内容 -->
        <view class="list-box">
          <view v-for="(item, i) in itemMap.list" :key="i" @click="selected(item)" class="detail-item">
            <slot name="item" :item="item">
              <view class="item-default">{{ item[nameKey] }}</view>
            </slot>
          </view>
        </view>
      </view>
    </view>
	<!-- 右侧字母表索引 -->
    <view id="indexed_letter_box" class="indexed-letter-box" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
      <view v-for="(tag, index) in tagList" :class="{'tag-item': true, 'active': index === selectedIndex && selectedOn}" :key="index">{{ tag }}</view>
    </view>
	<!-- 点击字母后显示选中的字母 -->
    <view v-show="selectedOn" class="tag-display">{{ tagList[selectedIndex] }}</view>
  </view>
</template>

<script>
import pinyinSorterUtil from "./index-list-cc";

export default {
  name: "index-list-cc",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tags: {
      type: Array,
      default: function() {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
          'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
      }
    },
    toTopTag: {
      type: String,
      default: '↑'
    },
    nameKey: {
      type: String,
      default: "name"
    },
    pinyinKey: {
      type: String,
      default: "pinyin"
    },
    defaultIndex: {
      type: String,
      default: "#"
    },
    headerMap: {
      type: Array,
      default: function() {
        return [];
      }
    },
    footerMap: {
      type: Array,
      default: function() {
        return [];
      }
    },
    inputKeywords: {
      type: String,
      default: ""
    },
  },
  computed: {
    tagList() {
      return [this.toTopTag, ...this.tags].filter(tag => !!tag)
    },
    pinyinList() {
      return this.data.map(item => {
        item[this.pinyinKey] = pinyinSorterUtil.getUcFirstCovert(item[this.nameKey], this.defaultIndex)
        return item
      })
    },
    indexedList() {
      let keyword = this.inputKeywords.length > 0 ? this.inputKeywords: this.keyword
      return this.pinyinList.filter(item => item[this.nameKey].includes(keyword))
    },
    indexedMap() {
      return this.headerMap.concat(pinyinSorterUtil.sortItemsByPinyin(this.indexedList, this.nameKey, this.tagList, this.pinyinKey), this.footerMap)
    },
    tagItemHeight() {
      return this.tagList.length > 0 ? this.tagRect.height / this.tagList.length : 0
    }
  },
  data() {
    return {
      keyword: '',
      selectedIndex: -1,
      selectedOn: false,
      tagRect: {
        top: 0,
        height: 0
      }
    };
  },
  watch:{
    tagList() {
      this.getIndexedLetterRect()
    },
    selectedIndex(index) {
      let tag = this.tagList[index].replace('#', 'end'), duration = 80

      if (tag === this.toTopTag) {
        uni.pageScrollTo({duration, scrollTop: 0});
      } else {
        let pageScrollTop, element = `#index_${tag}`
        uni.createSelectorQuery().in(this).selectViewport().scrollOffset((res) => {
          pageScrollTop = res.scrollTop; // 页面滚动距离
        }).select(element).boundingClientRect((rect) => {
          if (rect) {
            uni.pageScrollTo({duration, scrollTop: rect.top + pageScrollTop});
          }
        }).exec();
      }
    }
  },
  mounted() {
    this.getIndexedLetterRect()
  },
  methods: {
    selected(item) {
      // 获取选中元素的名字
          const itemName = item[this.nameKey]; // 假设名字存储在元素的nameKey属性中
      
          // 构建动态跳转路径，传递选中元素的名字作为参数
          const url = '/pages/product/tobacco-brand/tobacco-brand?name=' + itemName;
		if(itemName != "卷烟品牌"){
          // 跳转到新页面，携带参数
          uni.navigateTo({
            url: url,
            success: res => {
              console.log('页面跳转成功');
            },
            fail: err => {
              console.error('页面跳转失败', err);
            }
          });}
    },
	navigateBack(){
		uni.navigateBack()
	},
    getIndexedLetterRect() {
      let that = this
      uni.createSelectorQuery().in(this).select('#indexed_letter_box').boundingClientRect((rect) => {
        if (rect) {
          that.tagRect = rect
        }
      }).exec();
    },
    touchstart(e) {
      this.selectedOn = true
      this.touchmove(e)
    },
    touchend(e) {
      this.selectedOn = false
      this.touchmove(e)
    },
    touchmove(e) {
      if (e.changedTouches.length > 0) {
        let selectedIndex = parseInt((e.changedTouches[0].clientY - this.tagRect.top) / this.tagItemHeight)

        if (selectedIndex < 0) {
          selectedIndex = 0
        } else if (selectedIndex >= this.tagList.length) {
          selectedIndex = this.tagList.length - 1
        }

        this.selectedIndex = selectedIndex
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.indexed-list-cc {
  position: relative;
  width: auto;
  background-color: white;

	
.search-container {
	margin-top: 10px;
	display: flex;
	align-items: center;
}
.close-src{
	margin-left: 30px;
}

.input {
  border: 1px solid #ccc;
  height: 35px;
  width: 100%;
}

.search-default {
	width: 100%;
	margin: 24rpx;
	
}

  .indexed-head-title {
    padding: 12rpx 24rpx;
    background: #eeeeee;
    font-size: 22rpx;
  }

  .item-default{
    padding: 24rpx;
  }

  .indexed-letter-box {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    text-align: center;
    margin-right: 12rpx;

    .tag-item{
      padding: 0 12rpx;
      border-radius: 24rpx;
      font-size: 0.75rem;
    }

    .tag-item.active {
      background: #22ec52;
    }
  }

  .tag-display {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50rpx;
    height: 160rpx;
    width: 160rpx;
    text-align: center;
    line-height: 160rpx;
    border-radius: 6rpx;
    background: rgba(0,0,0,0.3);
  }
}
</style>