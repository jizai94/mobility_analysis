const getOption1 = (echeart1, echeart3) => {
    const isEmptyObject = (obj) => {
        var t;
        for (t in obj)
            return !1;
        return !0
    }
    let legend = {
        bottom: '20',
        data: []
    }
    let series = []
    if(!isEmptyObject(echeart1)){
        legend.data.push({
            name: echeart1.time,
            icon: 'roundRect'
        })
        series.push({
            name: echeart1.time,
            type: 'line',
            smooth: 'true',
            symbol: 'circle',
            symbolSize: 8,
            zlevel: 10,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            areaStyle: {
                normal: {
                    color: '#e2f1f6'
                }
            },
            data: echeart1.data
        })
    }
    if(!isEmptyObject(echeart3)){
        legend.data.push({
            name: echeart3.time,
            icon: 'roundRect'
        })
        series.push({
            name: echeart3.time,
            type: 'line',
            smooth: 'true',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(204, 204, 204)'
                }
            },
            areaStyle: {
                normal: {
                    color: '#fafafa'
                }
            },
            data: echeart3.data
        })
    }
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: legend,
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 1
            },
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
                    // 隔1个显示1个标签
            },
            boundaryGap: true,
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
            },
            splitLine: {
                lineStyle: {
                    type: 'dotted'
                }
            },
            axisLine: {
                show: false,
                onZero: false
            },
            axisTick: {
                show: false
            }
        },
        series: series
    };
    return option;
}


const getOption2 = (echeart2, echeart4) => {
    const isEmptyObject = (obj) => {
        var t;
        for (t in obj)
            return !1;
        return !0
    }
    let legend = {
        bottom: '20',
        data: []
    }
    let series = []
    if(!isEmptyObject(echeart2)){
        legend.data.push(echeart2.time)
        series.push({
            name: echeart2.time,
            type: 'line',
            zlevel: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            areaStyle: {
                normal: {
                    color: '#e2f1f6'
                }
            },
            data: echeart2.data
        })
    }
    if(!isEmptyObject(echeart4)){
        legend.data.push(echeart4.time)
        series.push({
            name: echeart4.time,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(204, 204, 204)'
                }
            },
            areaStyle: {
                normal: {
                    color: '#fafafa'
                }
            },
            data: echeart4.data
        })
    }
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: legend,
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 1
            },
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
                    // 隔1个显示1个标签
            },
            boundaryGap: true,
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                // 刻度与标签对齐
                alignWithLabel: true
            },
            splitLine: {
                lineStyle: {
                    type: 'dotted'
                }
            },
            axisLine: {
                show: false,
                onZero: false
            },
            axisTick: {
                show: false
            }
        },
        series: series
    };
    return option;
}

const getOption3 = (arr1,arr2,str) => {
    switch(str){
        case "ACTIVEUSER":
            str = ["活跃用户"]
            break; 
        case "ADDUSER":
            str = ["新增用户"]
            break;
        case "LOGINMEMBER":
            str = ["登录会员"]
            break;
        case "PERSTARTTIMES":
            str = ["人均启动次数"]
            break;
        case "PERUSERTIMES":
            str = ["次均使用时长(秒)"]
            break;
        default:
            str = ["活跃用户"]
    }
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: str
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
                alignWithLabel: 3
                    // 隔1个显示1个标签
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                }
            },
            boundaryGap: false,
            data: arr2
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
            axisTick: {
                show: false
            }
        },
        series: [{
            name: str,
            type: 'line',
            zlevel: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            data: arr1
        }]
    };
    return option;
}

const getOption4 = (echeart1, echeart2) => {
    const isEmptyObject = (obj) => {
        var t;
        for (t in obj)
            return !1;
        return !0
    }
    let legend = {
        bottom: '20',
        data: []
    }
    let series = []
    if(!isEmptyObject(echeart1)){
        legend.data.push(echeart1.time)
        series.push({
            name: echeart1.time,
            type: 'line',
            zlevel: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(0, 153, 204)'
                }
            },
            data: echeart1.data
        })
    }
    if(!isEmptyObject(echeart2)){
        legend.data.push(echeart2.time)
        series.push({
            name: echeart2.time,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(204, 204, 204)'
                }
            },
            data: echeart2.data
        })
    }
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: legend,
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 1
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                },
                interval: 1
            },
            boundaryGap: false,
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00',
                   '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00',
                   '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
                   '21:00', '22:00', '23:00']
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
            axisTick: {
                show: false
            }
        },
        series: series
    };
    return option;
}

const getOption5 = () => {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: ['访问次数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                }
            },
            boundaryGap: false,
            data: ['04/15','04/16','04/17','04/18','04/19','04/20',
                   '04/21','04/22','04/23','04/24','04/25','04/26',
                   '04/27','04/28','04/29','04/30','05/01','05/02'
            ]
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
            axisTick: {
                show: false
            }
        },
        series: [{
            name: '访问次数',
            type: 'line',
            zlevel: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: 'rgb(136, 195, 232)'
                }
            },
            data: [78,63,52,56,61,70,56,63,45,57,54,57,59,50,64,53,69,48]
        }]
    };
    return option;
}

const getOption6 = (obj) => {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '20',
            data: ['活跃用户', '活跃度']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLabel: {
                interval: 2
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid'
                },
                interval: 2
            },
            axisLabel: {
                textStyle: {
                  color: '#333'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#09c',
                  width: 2
                }
              },
              axisTick: {
                lineStyle: {
                  color: '#333'
                }
              },
            boundaryGap: false,
            // data: ['04/05','04/06','04/07','04/08','04/09','04/10',
            //        '04/11','04/12','04/13','04/14','04/15','04/16',
            //        '04/17','04/18','04/19','04/20','04/21','04/22',
            //        '04/23','04/24','04/25','04/26','04/27','04/28',
            //        '04/29','04/30','05/01','05/02','05/03','05/04'
            // ]
            data: obj.dateList
        }],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    // 刻度与标签对齐
                    alignWithLabel: true
                },
                splitLine: {
                    lineStyle: {
                        type: 'dotted'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                      color: '#09c',
                      width: 2
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    }
                }
            },
            {
                type: 'value',
                axisTick: {
                    // 刻度与标签对齐
                    alignWithLabel: true
                },
                splitLine: {
                    lineStyle: {
                        type: 'dotted'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} %',
                    textStyle: {
                      color: '#333'
                    }
                },
                axisLine: {
                    lineStyle: {
                      color: '#09c',
                      width: 2
                    }
                }
            },
        ],
        series: [
            {
                name: '活跃用户',
                type: 'line',
                zlevel: 10,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: 'rgb(0, 153, 204)'
                    }
                },
                // data: [78,63,52,56,61,70,56,63,45,57,54,57,59,50,64,53,69,48]
                data: obj.userActiveData
            },
            {
                name: '活跃度',
                type: 'line',
                yAxisIndex:1,
                symbol: 'square',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: 'rgb(204, 204, 204)'
                    }
                },
                // data: [76,62,53,57,65,70,56,63,45,57,54,57,59,50,64,53,69,48]
                data: obj.livenessData
            }
        ]
    };
    return option;
}

export { getOption1, getOption2, getOption3, getOption4, getOption5, getOption6 }