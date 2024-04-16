<template>
	<view>
		<text>{{name}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			};
		},
		created() {
			// 在组件创建时获取查询参数
			this.name = this.$route.query.name;
		},
		watch: {
			// 监视路由参数变化
			'$route.query.name'(newName) {
				this.name = newName;
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
