<template>
  <view class="container">
	  <cu-custom bgColor="bg-gradual-blue">
	  	<block slot="content">品牌</block>
	  </cu-custom>
    <index-list :data="list" :headerMap="headerMap" nameKey="nickname" v-on:selected="selected"></index-list>
  </view>
</template>

<script>
import indexList from '@/components/index-list-cc.vue';
export default {
  data() {
    return {
      list: [{"nickname":"黄鹤楼"},{"nickname":"云烟"},{"nickname":"南京"},{"nickname":"黄山"},{"nickname":"玉溪"},{"nickname":"娇子"},{"nickname":"利群"},{"nickname":"长白山"},{"nickname":"泰山"},{"nickname":"七匹狼"},{"nickname":"苏烟"},{"nickname":"红塔山"},{"nickname":"白沙"},{"nickname":"芙蓉王"},{"nickname":"黄金叶"},{"nickname":"贵烟"},{"nickname":"中南海"},{"nickname":"中华"},{"nickname":"钻石"},{"nickname":"双喜"},{"nickname":"双喜"},{"nickname":"兰州"},{"nickname":"红河"},{"nickname":"红金龙"},{"nickname":"真龙"},{"nickname":"金圣"},{"nickname":"大前门"},{"nickname":"牡丹"},{"nickname":"将军"},{"nickname":"红双喜(沪)"},{"nickname":"红杉树"},{"nickname":"小熊猫"},{"nickname":"好猫"},{"nickname":"熊猫"},{"nickname":"红旗渠"},{"nickname":"龙凤呈祥"},{"nickname":"红梅"},{"nickname":"黄果树"},{"nickname":"人民大会堂"},{"nickname":"天子"},{"nickname":"长城"},{"nickname":"钓鱼台"},{"nickname":"五叶神"},{"nickname":"金桥"},{"nickname":"大红鹰"},{"nickname":"一品梅"},{"nickname":"哈德门"},{"nickname":"冬虫夏草"},{"nickname":"好日子"},{"nickname":"帝豪"},{"nickname":"都宝"},{"nickname":"哈尔滨"},{"nickname":"呼伦贝尔"},{"nickname":"延安"},{"nickname":"林海灵芝"},{"nickname":"雄狮"},{"nickname":"庐山"},{"nickname":"雪莲"},{"nickname":"华西村"},{"nickname":"茶花"},{"nickname":"猴王"},{"nickname":"红山茶"},{"nickname":"石林"},{"nickname":"壹枝笔"},{"nickname":"王冠"},{"nickname":"恭贺新禧"},{"nickname":"福"},{"nickname":"上海"},{"nickname":"甲天下"},{"nickname":"芙蓉"},{"nickname":"恒大"},{"nickname":"三峡"},{"nickname":"双叶"},{"nickname":"江山"},{"nickname":"宝岛"},{"nickname":"大青山"},{"nickname":"羊城"},{"nickname":"散花"},{"nickname":"新石家庄"},{"nickname":"椰王"},{"nickname":"红三环"},{"nickname":"椰树"},{"nickname":"龙烟"},{"nickname":"红玫"},{"nickname":"黄山松"},{"nickname":"土楼"},{"nickname":"北戴河"},{"nickname":"利事"},{"nickname":"孟菲斯"},{"nickname":"老仁义"},{"nickname":"雪域"},{"nickname":"北京"},{"nickname":"梦都"},{"nickname":"紫气东来"},{"nickname":"厦门"},{"nickname":"凤凰"},{"nickname":"古田"},{"nickname":"月兔"},{"nickname":"红双喜(鄂)"},{"nickname":"味美思"},{"nickname":"三沙"}],
	  // list: [{"uid":"ex","username":"ex","nickname":"c阿萨德","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"#das发生","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"不是你","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"初始化","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"打啥电话健康","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"跟俺说的","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"让啥","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"是阿斯顿","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"以上的","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"这是啊大姐","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"啊打算试试","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"打电话健康","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"八十多","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"啊啊是的","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"啊发生","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"不是你","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"初始化","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"打啥电话健康","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"跟俺说的","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"让啥","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"是阿斯顿","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"以上的","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"这是啊大姐","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"啊打算试试","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"打电话健康","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"八十多","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"啊啊是的","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"},{"uid":"ex","username":"ex","nickname":"@啊发生","avatar":"https://pic.rmb.bdstatic.com/bjh/down/812a61e10fda57d500987a589559a806.jpeg","gender":1,"allowType":1,"friendRemark":"EX"}],
      headerMap: [
        {
          index: '',
          list: [
            {
              avatar: '',
              nickname: '卷烟品牌'
            },
            {
              avatar: '',
              nickname: '卷烟企业',
            },
          ]
        }
      ],
    }
  },
  components:{indexList},
  methods: {
    selected(item) {
      console.info(item)
    }
  }
}
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>