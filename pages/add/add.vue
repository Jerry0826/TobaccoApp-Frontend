<template>
	<view class="page_pingjia4">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">发布评论</block>
		</cu-custom>
		<view class="kuang">
			<!-- <view class="biaoti" v-for="(item,index) in por">{{item.title}}</view> -->
			<yealuo-inputs style="margin: 30upx auto;font-size: 35upx; border: 1px solid #ccc;"
			value="" 
			placeholder='请选择卷烟品牌' 
			:binData="data2"
			checkType="radio"
			overflow="auto"
			@getBackVal="getBackVal"
			:selectIco="true"></yealuo-inputs>
			<view >
				<!-- <start :count="count" v-model="value" size="35" activeColor="#ffaa00"></start> -->
			</view>
			<view class="xkuang">
				<view style="display: flex;" v-for="(item,index) in rate">
					<view class="ziti">{{item.name}}</view>
					<start :count="item.count" style="margin-top: 15px; margin-left: 50px;" size="35"
						activeIcon="heart-fill" inactiveIcon="heart" activeColor="#ffaa00" v-model="item.value1">
					</start>
				</view>
			</view>
			<view>
				<textarea style="margin-top: 20px; border: 1px solid #ccc; width: 100%;" background-color="#6d6d6d" v-model="value3" placeholder="请输入评论内容">
				</textarea>
			</view>
			<!-- <upload :fileList="fileList1" style="margin-top: 10px;" @afterRead="afterRead" @delete="deletePic"
				name="1" multiple :maxCount="10" action='链接地址'></upload> -->
			<view class="niming">
				<!-- <radio-group v-model="radiovalue1" placement="column" @change="groupChange">
					<radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in hidden" :key="index"
						:label="item.name" :name="item.name">
					</radio>
				</radio-group> -->
			</view>
			<view class="anniu" v-for="(item,index) in button">
				<button type="primary">{{item.name}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import start from '@/components/uni-rate.vue';
	import yealuoInputs from '@/components/yealuo-select.vue';
	export default {
		components: {
			start,yealuoInputs
		},
		data() {
			return {
				count: "5",
				value: '',
				value3: '',
				radiovalue1: '',
				fileList1: [],
				data2: [
					  { "id": 1, "value": "黄鹤楼" },
					  { "id": 2, "value": "云烟" },
					  { "id": 3, "value": "南京" },
					  { "id": 4, "value": "黄山" },
					  { "id": 5, "value": "玉溪" },
					  { "id": 6, "value": "娇子" },
					  { "id": 7, "value": "利群" },
					  { "id": 8, "value": "长白山" },
					  { "id": 9, "value": "泰山" },
					  { "id": 10, "value": "七匹狼" },
					  { "id": 11, "value": "苏烟" },
					  { "id": 12, "value": "红塔山" },
					  { "id": 13, "value": "白沙" },
					  { "id": 14, "value": "芙蓉王" },
					  { "id": 15, "value": "黄金叶" },
					  { "id": 16, "value": "贵烟" },
					  { "id": 17, "value": "中南海" },
					  { "id": 18, "value": "中华" },
					  { "id": 19, "value": "钻石" },
					  { "id": 20, "value": "双喜" },
					  { "id": 21, "value": "兰州" },
					  { "id": 22, "value": "红河" },
					  { "id": 23, "value": "红金龙" },
					  { "id": 24, "value": "真龙" },
					  { "id": 25, "value": "金圣" },
					  { "id": 26, "value": "大前门" },
					  { "id": 27, "value": "牡丹" },
					  { "id": 28, "value": "将军" },
					  { "id": 29, "value": "红双喜(沪)" },
					  { "id": 30, "value": "红杉树" },
					  { "id": 31, "value": "小熊猫" },
					  { "id": 32, "value": "好猫" },
					  { "id": 33, "value": "熊猫" },
					  { "id": 34, "value": "红旗渠" },
					  { "id": 35, "value": "龙凤呈祥" },
					  { "id": 36, "value": "红梅" },
					  { "id": 37, "value": "黄果树" },
					  { "id": 38, "value": "人民大会堂" },
					  { "id": 39, "value": "天子" },
					  { "id": 40, "value": "长城" },
					  { "id": 41, "value": "钓鱼台" },
					  { "id": 42, "value": "五叶神" },
					  { "id": 43, "value": "金桥" },
					  { "id": 44, "value": "大红鹰" },
					  { "id": 45, "value": "一品梅" },
					  { "id": 46, "value": "哈德门" },
					  { "id": 47, "value": "冬虫夏草" },
					  { "id": 48, "value": "好日子" },
					  { "id": 49, "value": "帝豪" },
					  { "id": 50, "value": "都宝" },
					  { "id": 51, "value": "哈尔滨" },
					  { "id": 52, "value": "呼伦贝尔" },
					  { "id": 53, "value": "延安" },
					  { "id": 54, "value": "林海灵芝" },
					  { "id": 55, "value": "雄狮" },
					  { "id": 56, "value": "庐山" },
					  { "id": 57, "value": "雪莲" },
					  { "id": 58, "value": "华西村" },
					  { "id": 59, "value": "茶花" },
					  { "id": 60, "value": "猴王" },
					  { "id": 61, "value": "红山茶" },
					  { "id": 62, "value": "石林" },
					  { "id": 63, "value": "壹枝笔" },
					  { "id": 64, "value": "王冠" },
					  { "id": 65, "value": "恭贺新禧" },
					  { "id": 66, "value": "福" },
					  { "id": 67, "value": "上海" },
					  { "id": 68, "value": "甲天下" },
					  { "id": 69, "value": "芙蓉" },
					  { "id": 70, "value": "恒大" },
					  { "id": 71, "value": "三峡" },
					  { "id": 72, "value": "双叶" },
					  { "id": 73, "value": "江山" },
					  { "id": 74, "value": "宝岛" },
					  { "id": 75, "value": "大青山" },
					  { "id": 76, "value": "羊城" },
					  { "id": 77, "value": "散花" },
					  { "id": 78, "value": "新石家庄" },
					  { "id": 79, "value": "椰王" },
					  { "id": 80, "value": "红三环" },
					  { "id": 81, "value": "椰树" },
					  { "id": 82, "value": "龙烟" },
					  { "id": 83, "value": "红玫" },
					  { "id": 84, "value": "黄山松" },
					  { "id": 85, "value": "土楼" },
					  { "id": 86, "value": "北戴河" },
					  { "id": 87, "value": "利事" },
					  { "id": 88, "value": "孟菲斯" },
					  { "id": 89, "value": "老仁义" },
					  { "id": 90, "value": "雪域" },
					  { "id": 91, "value": "北京" },
					  { "id": 92, "value": "梦都" },
					  { "id": 93, "value": "紫气东来" },
					  { "id": 94, "value": "厦门" },
					  { "id": 95, "value": "凤凰" },
					  { "id": 96, "value": "古田" },
					  { "id": 97, "value": "月兔" },
					  { "id": 98, "value": "红双喜(鄂)" },
					  { "id": 99, "value": "味美思" },
					  { "id": 100, "value": "三沙" }
					],
				por: [{
					// title: '"无可挑剔"',
				}],
				rate: [{
						name: "口味",
						count: "5",
						value1: '',
					},
					{
						name: "包装",
						count: "5",
						value1: '',
					},
					{
						name: "价格",
						count: "5",
						value1: '',
					},
					{
						name: "综合",
						count: "5",
						value1: '',
					}
				],
				button: [{
					name: '提交'
				}],

				hidden: [{
					name: '匿名评论',
					disabled: false
				}],
			}
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.page_pingjia4 {
		width: 100vw;
		height: 80vh;
		background-color: #ffffff;

		.anniu {
			margin-top: 48px;
			width: 90vw;
		}

		.niming {
			margin-top: 20px;
		}

		.ziti {
			color: #909090;
			margin-top: 23px;
		}

		.xkuang {
			margin-top: 20px;
			height: 25vh;
			background-color: #FAFAFA;
			padding-left: 30px;
		}

		.xx {
			margin-left: 24%;
			padding-top: 10px;
		}

		.biaoti {
			width: 80%;
			margin: 0 auto;
			text-align: center;
			margin-top: 20px;
		}

		.kuang {
			width: 90vw;
			height: 75vh;
			background-color: #ffffff;
			margin-left: 20px;
		}
	}
</style>
