const getOption = () => {
	const option = {
		tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: [
                {
                    name: '留存率',
                    // icon: 'roundRect'
                } 
            ]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
                    // 隔1个显示1个标签
            },
            splitLine: {
            	show: true,
                lineStyle: {
                    type: 'solid'
                }
            },
            boundaryGap: false,
            data: ['04/04','04/05','04/06', '04/07','04/08', '04/09','04/10', '04/11','04/12', '04/13',
            		'04/14', '04/15','04/16', '04/17','04/18','04/19', '04/20', '04/21','04/22', '04/23', 
            		'04/24', '04/25','04/26','04/27','04/28','04/29','04/30','05/01','05/02']
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
            },
            splitLine: {
                lineStyle: {
                    type: 'solid'
                }
            },
            axisLine: {
                show: true,
                onZero: true
            },
            axisTick: {
                show: true
            }
        },
        series: [{
            name: '留存率',
            type: 'line',
            // smooth: 'true',
            symbol: 'circle',
            symbolSize: 8,
            zlevel: 10,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            // areaStyle: {
            //     normal: {
            //         color: ['#e2f1f6']
            //     }
            // },
            data: ['57.14','57.14','37.14','28.75','20.04','37.50','44.44','55.56','40.00','20.00','37.5','50.00','20.00','0.00',
            		'20.00','33.33','0','50.00','0.0','0.0','14.28','50.14','33.33','0.00','50.14','33.33','0.00','11.14','23.14','57.14']
        } ]
	}
	return option;
}

//用户留存
const getOption1 = (dateArr,arr) => {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: [
                {
                    name: '留存率',
                    // icon: 'roundRect'
                } 
            ]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
                    // 隔1个显示1个标签
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                }
            },
            boundaryGap: false,
            data: dateArr
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
            },
            splitLine: {
                lineStyle: {
                    type: 'solid'
                }
            },
            axisLine: {
                show: true,
                onZero: true
            },
            axisTick: {
                show: true
            }
        },
        series: [{
            name: '留存率',
            type: 'line',
            // smooth: 'true',
            symbol: 'circle',
            symbolSize: 8,
            zlevel: 10,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            // areaStyle: {
            //     normal: {
            //         color: ['#e2f1f6']
            //     }
            // },
            data: arr
        } ]
    }
    return option;
}

export { getOption , getOption1 };