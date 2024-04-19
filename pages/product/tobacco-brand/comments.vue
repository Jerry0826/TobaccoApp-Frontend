<template>
    <view class="test">
        <!-- <view class="title">
            1、单选 -- {{city_ids1}}
        </view>
        <view class="val">
            {{city_name1}}
        </view>
        <wyh-tree-select :items="items" :activeIds="city_ids1" :max="1" @clickItem="onItem"/> -->
        <!-- <view class="title">
            2、多选 -- {{city_ids2}}
        </view>
        <view class="val">
            {{city_name2}}
        </view>
        <wyh-tree-select :items="items" :activeIds="city_ids2" :max="2"/>

        <view class="title">
            3、全选 -- {{city_ids5}}
        </view>
        <view class="val">
            {{city_name5}}
        </view>
        <wyh-tree-select :items="items" :activeIds="city_ids5" :selectAll="true"/>

        <view class="title">
            4、搭配弹出层 -- {{city_ids3}}
        </view>
        <view class="select" @click="$refs.popup_citys.open()">
            <view class="title">选择城市</view>
            <view class="val">{{city_name3}}</view>
        </view>
        <uni-popup class="citys_win popup_win" ref="popup_citys" type="bottom">
            <wyh-tree-select :items="items" :activeIds="city_ids3" :title="'选择地区'"/>
        </uni-popup>
        <view class="title">
            5、搭配弹出层(showNav) -- {{city_ids4}}
        </view>
        <view class="select" @click="$refs.popup_citys2.open()">
            <view class="title">选择城市</view>
            <view class="val">{{city_name4}}</view>
        </view>
        <uni-popup class="citys_win popup_win" ref="popup_citys2" type="bottom">
            <wyh-tree-select :items="items" :activeIds="city_ids4" :title="'选择地区'" :showNav="true" @clickCancel="onCancel" @clickConfirm='onConfirm'/>
        </uni-popup> -->

        <view class="title">
            消费者评论
        </view>
        <view class="select" @click="$refs.popup_citys3.open()">
            <view class="title1">>选择评论类型</view>
            <view class="val">{{city_name6}}</view>
        </view>
        <uni-popup class="citys_win popup_win" ref="popup_citys3" type="bottom">
            <wyh-tree-select :items="items" :activeIds="city_ids6" :title="'选择地区'" :showNav="true" :selectAll="true" @clickCancel="onCancel2" @clickConfirm='onConfirm2'/>
        </uni-popup>

        <!-- <view class="title">
            7、搭配弹出层-搜索、全选(showNav) -- {{city_ids7}}
        </view>
        <view class="select" @click="$refs.popup_citys4.open()">
            <view class="title">选择城市</view>
            <view class="val">{{city_name7}}</view>
        </view>
        <uni-popup class="citys_win popup_win" ref="popup_citys4" type="bottom">
            <wyh-tree-select :items="items" :activeIds="city_ids7" :title="'选择地区'" :defaultActiveColor="'red'" :showNav="true" :selectAll="true" :isSearch="true" @clickCancel="onCancel3" @clickConfirm='onConfirm3'/>
        </uni-popup> -->
		<piaoyi-comment-list :apprises="apprises"></piaoyi-comment-list>
    </view>
</template>

<script>
import wyhTreeSelect from '@/components/wyh-tree-select/wyh-tree-select.vue';
import piaoyiCommentList from '@/components/piaoyi-commentList/piaoyi-commentList.vue';

    export default {
        computed: {
            // city_name1() {
            //     return this.getCityNames(this.city_ids1);
            // },
            // city_name2() {
            //     return this.getCityNames(this.city_ids2);
            // },
            // city_name3() {
            //     return this.getCityNames(this.city_ids3);
            // },
            // city_name4() {
            //     return this.getCityNames(this.city_ids4);
            // },
            // city_name5() {
            //     return this.getCityNames(this.city_ids5);
            // },
            city_name6() {
                return this.getCityNames(this.city_ids6);
            },
            // city_name7() {
            //     return this.getCityNames(this.city_ids7);
            // }
        },
        data() {
            return {
                items: [{
                        text: '好评',
                        children: [
                            {
                                // 名称
                                text: '口感不错',
                                // id，作为匹配选中状态的标识符
                                id: 1,
                                // 禁用选项
                                // disabled: true,
                            },
                            {
                                text: '烟味很好',
                                id: 2,
                            },{
                                text: '价格实惠',
                                id: 3
                            },{
                                text: '品质好',
                                id: 4
                            }
                        ],
                        dot: false
                    },
                    {
                        text: '中评',
                        children: [
                            {
                                // 名称
                                text: '一般',
                                id: 5,
                                // 禁用选项
                                // disabled: true,
                            },
                        ],
                        dot: false
                    },
                    {
                        text: '差评',
                        // disabled: true,
                        children: [
                            {
                                // 名称
                                text: '烟味不好',
                                id: 6,
                            },
							{
                                // 名称
                                text: '包装难看',
                                id: 7,
                            },
                            {
                                // 名称
                                text: '价格昂贵',
                                id: 8,
                            }
                        ],
						dot: false,
                    }
                ],
                // city_ids1: [0],
                // city_ids2: [3],
                // city_ids3: [2],
                // city_ids4: [],
                // city_ids5: [2,3],
                city_ids6: [0],
                // city_ids7: [7]
            
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
						}],
			}
        },
		components:{
			wyhTreeSelect,piaoyiCommentList,
		},
        methods: {
            onItem(res) {
                console.log(res);
            },
            getCityNames(ids) {
                if(!ids) return;
                if(ids.length == 0) {
                    return '';
                }
                let city_name = [];
                this.items.map(function (item, index) {
                    item.children.map(function (city, ind) {
                        ids.map(function (id, i) {
                            if(id == city.id) {
                                city_name.push(city.text);
                            }
                        })
                    })
                })
                return city_name.join(',');
            },
            onCancel() {
                this.$refs.popup_citys2.close();
            },
            onConfirm(res) {
                let ids = [];
                res.map(function (item, ind) {
                    ids.push(item.id);
                })
                this.city_ids4 = ids;
                this.$refs.popup_citys2.close();
            },
            onCancel2() {
                this.$refs.popup_citys3.close();
            },
            onConfirm2(res) {
                let ids = [];
                res.map(function (item, ind) {
                    ids.push(item.id);
                })
                this.city_ids6 = ids;
                this.$refs.popup_citys3.close();
            },
            onCancel3() {
                this.$refs.popup_citys4.close();
            },
            onConfirm3(res) {
                let ids = [];
                res.map(function (item, ind) {
                    ids.push(item.id);
                })
                this.city_ids7 = ids;
                this.$refs.popup_citys4.close();
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    page {
        background: #F4F4F4 !important;
    }
    .test {
        padding-bottom: 800rpx;
		// background-color: white;
        .title {
            padding: 20rpx;
			font-size: 40rpx;
            font-weight: 700;
        }
		.title1{
			padding: 20rpx;
			font-size: 30rpx;
		}
        .val {
            display: flex;
            align-items: center;
            height: 80rpx;
            padding: 0 20rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
        }
    }
</style>