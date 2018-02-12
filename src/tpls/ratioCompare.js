/**
 * Created by xiaxue on 2017/5/13.
 */
var ratioCompare={};
ratioCompare.showEcharts=function(){
    showTotalScaleGraph();

    $(".graphBtn").click(function(){
        $(this).addClass("btnActive").siblings().removeClass("btnActive");
        $(".graphContainer>div").eq($(this).index()).css("display","block").siblings().css("display","none");
        showTotalScaleGraph();
        showRatioCompareGraph();
    })
}


//资产净申购及总规模图表：
function showTotalScaleGraph(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('totalScale'));
// 指定图表的配置项和数据
    var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
    var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }

    option = {
        title: {
            text: '特性示例：渐变色 阴影 点击缩放',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: false,
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(255,255,255,0)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#188df0'},
                                {offset: 0.5, color:"#A7C2DF" },
                                {offset: 1, color: '#E0DFDD'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#90B0D7'},
                                {offset: 1, color: '#A7C2DF'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };

// Enable data zoom when user click bar.
//     var zoomSize = 6;
//     myChart.on('click', function (params) {
//         console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
//         myChart.dispatchAction({
//             type: 'dataZoom',
//             startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//             endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
//         });
//     });

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


//每日预计收益率及实际收益率对比图表：
function showRatioCompareGraph(){
    var myChart = echarts.init(document.getElementById('ratioCompare'));
    option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    myChart.setOption(option);
}