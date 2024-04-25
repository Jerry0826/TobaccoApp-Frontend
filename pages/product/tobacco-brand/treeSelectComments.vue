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
                                text: '品质好',
                                id: 3
                            }
                        ],
                        dot: false
                    },
                    {
                        text: '中评',
                        children: [
                            {
                                // 名称
                                text: '包装普通',
                                id: 4,
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
                                text: '价格昂贵',
                                id: 5,
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
				                },],
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