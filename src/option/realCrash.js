import { today, yesterday, timeToMs } from 'GLOBAL'

export const getOption = (chooseDate, todayData, chooseDateData) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    legend: {
      bottom: '0',
      data:[
        {
          name: today,
          icon: 'roundRect'
        },
        {
            name: chooseDate,
            icon: 'roundRect'
        }
      ]
    },
    xAxis : [
      {
        type : 'category',
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            interval: 1,
            textStyle: {
                color: '#000'
            }
        },
        axisLine: {
            onZero: false,
            lineStyle: {
                color: '#000'
            }
        },
        boundaryGap : true,
        data : ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', 
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', 
        '20:00', '21:00', '22:00', '23:00']
      }
    ],
    yAxis : {
      type: 'value',
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        formatter: '{value}%'
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
      /*min: 0,
      max: 0.25*/
    },
    series: [{
      name: today,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      showAllSymbol: true,
      zlevel: 10,
      areaStyle: {
          normal: {
              color: '#e6f5fa'
          }
      },
      itemStyle: {
          normal: {
              color: 'rgb(0, 153, 204)'
          }
      },
      data: todayData
    },
    {
      name: chooseDate,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      showAllSymbol: true,
      areaStyle: {
        normal: {
          color: '#fafafa'
        }
      },
      itemStyle: {
          normal: {
              color: 'rgb(204, 204, 204)'
          }
      },
      data: chooseDateData
    }]

  }
  return option
}