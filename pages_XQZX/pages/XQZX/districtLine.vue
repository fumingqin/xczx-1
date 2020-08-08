<template>
	<view>
		<!-- #ifdef H5 -->
		<web-view src="http://0595.mygolbs.com:8081/qzh5/index.html"></web-view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<web-view src="http://0595.mygolbs.com:8081/qzh5/index.html"></web-view>
		<!-- #endif -->
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

</style>
