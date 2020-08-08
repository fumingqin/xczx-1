<template>
	<view>
		<view>{{ utils.friendlyDate(timestamp) }}</view>
	</view>
</template>

<script>
import utils from './utils.filter.js';

export default {
	name: 'UniDate',
	data() {
		return {
			utils: utils
		};
	},
	created() {
		console.log(this.timestr);
		
		// 如果传递来的是时间戳
		// this.timestamp = this.timestr;

		this.timestamp = new Date(this.timestr).getTime();
	},
	props: {
		timestr: {
			type: [String],
			default: ''
		}
	}
};
</script>

<style lang="scss"></style>
