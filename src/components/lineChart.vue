<template>
	<div>
		<div class="chart" :id="chartData.id"></div>
	</div>
</template>

<script>
export default{
	props:{
		chartData : {
			type : Object,
			default : () => {
				return{
					name : "",
					X : [],
					data : []
				}
			}
		}
	},
	data(){
		return{
			option : {}
		}
	},
	mounted() {
		this.option = {
				title : {
					text : this.chartData.name,
					left : "center"
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis : {
					type: 'category',
					boundaryGap : false,
					interval : 7,
					data : this.chartData.X
				},
				yAxis : {
					type : 'value',
				},
				dataZoom: [
					{
						type: 'inside',
						startValue: 0,
						endValue : 5
					}, 
					{
						type : "slider",
						startValue: 0,
						endValue : 5,
						handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
						handleSize: '70%',
						handleStyle: {
							color: '#fff',
							shadowBlur: 5,
							shadowColor: 'rgba(0, 0, 0, 0.6)',
							shadowOffsetX: 2,
							shadowOffsetY: 2
						}
					},
				],
				series:[
					{
						name : this.chartData.name,
						type : 'line',
						data : this.chartData.data,
						itemStyle : {
							color : this.chartData.color
						},
						lineStyle : {
							color : this.chartData.color
						},
						areaStyle : {
							color : this.chartData.color
						}
					}
				]
			}
			let myChart = this.$echarts.init(document.getElementById(this.chartData.id))
			myChart.setOption(this.option)
	}
}
</script>

<style>
	.chart{
		width: 100%;
		height: 300px;
	}
</style>
