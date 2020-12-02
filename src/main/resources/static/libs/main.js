function init() {
    const vbox = ht.ui.dsl.vbox
    const hbox = ht.ui.dsl.hbox
    const label = ht.ui.dsl.label
    const displayview = ht.ui.dsl.displayview
    const echartview = ht.ui.dsl.echartview
    const relativelayout = ht.ui.dsl.relativelayout
    const htview = ht.ui.dsl.htview

    //var canvas = document.createElement('canvas');

    let mv = new window.ModelView()
    mv.createViewModel({
        data: {
            weather: {
                city: '南京',
                code: 0,
                text: '晴',
                temperature: '26℃',
                windSpeed: '6',
            }
        },
        computed: {
            weatherIcon: function () {
                return getWeatherIcon(this.weather.code)
            }
        }
    })

    function getWeatherIcon(code) {
        switch (parseInt(code)) {
            case 0:
            case 1:
                return '\uf00d'
            case 2:
            case 3:
                return '\uf02e'
            case 4:
                return '\uf013'
            case 5: // wi-day-cloudy
            case 7:
                return '\uf002'
            case 6: // wi-night-alt-cloudy
            case 8:
                return '\uf086'
            case 9: //	阴
                return '\uf041'
            case 10: //	阵雨
                return '\uf01a'
            case 11: //	雷阵雨
                return '\uf01d'
            case 12: //	雷阵雨伴有冰雹
                return '\uf01d'
            case 13: //	小雨
            case 14: //	中雨
            case 15: //	大雨
                return '\uf019'
            case 16: //	暴雨
            case 17: //	大暴雨
            case 18: //	特大暴雨
                return '\uf01e'
            case 19: //	冻雨
                return '\uf01d'
            case 20: //	雨夹雪
                return '\uf017'
            case 21: //	雪
            case 22: //
            case 23: //
            case 24: //
            case 25: //
                return '\uf01b'
            case 26: // 沙尘
            case 27:
            case 28:
            case 29:
                return '\uf063'
            case 30: // 雾
                return '\uf014'
            case 31: // 霾
                return '\uf0b6'
            case 32: // 风
                return '\uf021'
            case 33: // 大风
                return '\uf050'
            case 34: // 飓风
                return '\uf082'
            case 35: // 热带风暴
                return '\uf082'
            case 36: // 龙卷风
                return '\uf056'
            case 37: // 冷
                return '\uf076'
            case 38: // 热
                return '\uf072'
            default: // 未知
                return '\uf07b'
        }
    }

    function createWeatherPanel() {
        return hbox({
            layoutParams: {
                // width: 200,
                // height: 30,
                marginTop: 5,
                marginRight: 20,
            },
            background: null,
            gap: 10,
            children: [
                label({
                    textFont: '16px weathericons',
                    textColor: 'rgb(108,230,190)',
                    text: mv.bind('weatherIcon')
                }),
                label({
                    textFont: '16px weathericons',
                    textColor: '#fff',
                    text: mv.bind('weather.city')
                }),
                label({
                    textFont: '16px weathericons',
                    textColor: '#fff',
                    text: mv.bind('weather.text')
                }),
                label({
                    textFont: '16px weathericons',
                    textColor: 'rgb(108,230,190)',
                    text: mv.bind('weather.temperature')
                }),
                label({
                    textFont: '16px weathericons',
                    textColor: '#fff',
                    text: '风速'
                }),
                label({
                    textFont: '16px weathericons',
                    textColor: 'rgb(108,230,190)',
                    text: mv.bind('weather.windSpeed')
                }),
                label({
                    textFont: '16px weathericons',
                    textColor: '#fff',
                    text: 'm/s'
                }),
            ]
        })
    }

    function createTopPanel() {
        return hbox({
            layoutParams: {
                width: 'match_parent',
                height: 70,
                vAlign: 'top'
            },
            background: new ht.ui.drawable.ImageDrawable('symbols/common/背景/top.json', 'fill', null, {
                x: 'center',
                y: 'bottom',
                width: 'wrap_content',
                height: 'wrap_content'
            }),
            children: [
                displayview({
                    layoutParams: {
                        width: 200,
                        height: 36,
                        marginLeft: 20,
                    },
                    autoFitContent: true,
                    displayUrl: 'displays/platform/新能源/大屏/日期时间.json',
                }),

                label({
                    background: null,
                    matchParent: true,
                    align: 'center',
                    textColor: '#FFF',
                    textFont: '26px Arial,sans-serif',
                    text: '发射井监测平台'
                }),

                createWeatherPanel()
            ]
        })
    }

    function createLeftPanel(params) {
        const title = params.title
        const name = params.name
        const value = params.value
        const unit = params.uinit
        const content = params.content

        return relativelayout({
            matchParent: true,
            background: null,
            children: [
                vbox({
                    layoutParams: {
                        width: 'match_parent',
                        height: 'match_parent',
                        marginTop: 8,
                        marginRight: 110,
                        marginBottom: 10,
                        marginLeft: 10,
                    },
                    padding: 8,
                    borderRadius: 8,
                    background: 'rgba(3,12,33,0.5)',
                    children: [
                        hbox({
                            matchParentWidth: true,
                            background: null,
                            gap: 8,
                            children: [
                                label({
                                    layoutParams: {
                                        vAlign: 'bottom',
                                    },
                                    textColor: '#FFF',
                                    textFont: '14px Arial,sans-serif',
                                    text: unit
                                }),
                                label({
                                    textColor: '#ffee51',
                                    textFont: '18px Arial,sans-serif',
                                    text: value
                                }),
                                label({
                                    layoutParams: {
                                        vAlign: 'bottom',
                                    },
                                    textColor: '#FFF',
                                    textFont: '14px Arial,sans-serif',
                                    text: name
                                }),
                                label({
                                    matchParentWidth: true,
                                    align: 'right',
                                    text: title,
                                    textColor: '#3fb1e3',
                                    textFont: '18px Arial,sans-serif'
                                }),
                            ]
                        }),
                        content
                    ]
                }),
                label({
                    layoutParams: {
                        align: 'right',
                        vAlign: 'top',
                        width: 'match_parent',
                        height: 30,
                    },
                    background: new ht.ui.drawable.ImageDrawable('symbols/common/背景/title1.json', 'fill', null, {
                        x: 'right',
                        y: 'top',
                        width: 'wrap_content',
                        height: 'wrap_content'
                    })
                }),
            ]
        })
    }

    function createRightPanel(params) {
        const title = params.title
        const name = params.name
        const value = params.value
        const unit = params.uinit
        const content = params.content

        return relativelayout({
            matchParent: true,
            background: null,
            // padding: [10, 0, 0, 120],
            children: [

                vbox({
                    layoutParams: {
                        width: 'match_parent',
                        height: 'match_parent',
                        marginTop: 8,
                        marginRight: 10,
                        marginBottom: 10,
                        marginLeft: 110,
                    },
                    padding: 8,
                    borderRadius: 8,
                    background: 'rgba(3,12,33,0.5)',
                    children: [
                        hbox({
                            matchParentWidth: true,
                            background: null,
                            gap: 8,
                            children: [
                                label({
                                    matchParentWidth: true,
                                    text: title,
                                    textColor: '#3fb1e3',
                                    textFont: '18px Arial,sans-serif'
                                }),
                                label({
                                    layoutParams: {
                                        vAlign: 'bottom',
                                    },
                                    textColor: '#FFF',
                                    textFont: '14px Arial,sans-serif',
                                    text: name
                                }),
                                label({
                                    textColor: '#ffee51',
                                    textFont: '18px Arial,sans-serif',
                                    text: value
                                }),
                                label({
                                    layoutParams: {
                                        vAlign: 'bottom',
                                    },
                                    textColor: '#FFF',
                                    textFont: '14px Arial,sans-serif',
                                    text: unit
                                }),
                            ]
                        }),
                        content,
                    ]
                }),
                label({
                    layoutParams: {
                        align: 'right',
                        vAlign: 'top',
                        width: 'match_parent',
                        height: 30,
                    },
                    background: new ht.ui.drawable.ImageDrawable('symbols/common/背景/title2.json', 'fill', null, {
                        x: 'left',
                        y: 'top',
                        width: 'wrap_content',
                        height: 'wrap_content'
                    })
                }),
            ]
        })
    }

    // 当月发电趋势
    var days = []
    var monthData = []
    for (var i = 1; i <= 31; i++) {
        days.push(i)
        monthData.push(150 + parseInt(Math.random() * 150 * 0.1) - 7.5)
    }
    var left2 = createLeftPanel({
        title: '任务消耗统计',
        name: '累计消耗',
        value: '30828.773',
        unit: '万吨',
        content: echartview({
            matchParent: true,
            background: null,
            theme: 'walden',
            option: {
                //color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 20,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: days,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    // name: '万度',
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 万吨'
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: '任务消耗',
                    type: 'bar',
                    barWidth: '60%',
                    data: monthData
                    // data: [10, 52, 200, 334, 390, 330, 220, 200, 334, 390, 330, 230, 256, 340, 390, 330, 220, 200, 280]
                }]
            }
        })
    })

    var hours = []
    var yesterdayData = [1.9, 2.6, 2.3, 2, 2.3, 2, 3, 4.4, 6, 9, 11, 14, 13.4, 16, 13.5, 14, 10, 8.3, 4.8, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4]
    var todayData = [2, 2.4, 2.2, 2.1, 2.4, 3.1, 4, 4.5, 7, 10, 12, 13, 14, 15, 14, 13, 12, 9, 5, 3, 3, 3, 2.5, 2.2, 2.1]
    for (let i = 0; i < 24; i++) {
        hours.push(i)
        // yesterdayData.push(50 + parseInt(Math.random() * 10))
        // todayData.push(50 + parseInt(Math.random() * 10))
    }
    // 发电曲线
    var left4 = createLeftPanel({

        title: '当年发射计划',
        name: '年计划完成率',
        value: '12.99%',
        content: echartview({
            matchParent: true,
            theme: 'walden',
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                    label: {
                        backgroundColor: '#777'
                    }
                },
                grid: {
                    top: 20,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    containLabel: true
                },
                legend: {
                    show: false,
                    right: 0,
                    top: 0,
                    data: ['计划', '实际', '计划完成率']
                },
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    // name: '万度',
                    min: 0,
                    max: 200,
                    interval: 50,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                    {
                        type: 'value',
                        // name: '计划完成率',
                        min: 0,
                        max: 120,
                        //interval: 5,
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                series: [{
                    name: '计划',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                    {
                        name: '实际',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        name: '计划完成率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [90.0, 80.2, 83.3, 74.5, 96.3, 110.2, 90.3, 123.4, 83.0, 116.5, 102.0, 96.2]
                    }
                ]
            }
        })
    })

    var left1 = displayview({
        matchParent: true,
        autoFitContent: true,
        padding: [10, 0, 0, 120],
        displayUrl: 'displays/platform/新能源/大屏/设备统计.json',
    })

    var left3 = createLeftPanel({
        title: '当月发射计划执行',
        content: echartview({
            matchParent: true,
            theme: 'walden',
            background: null,
            option: {
                grid: {
                    top: 20,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    containLabel: true
                },
                xAxis: {
                    data: ['江宁园区', '新疆', '甘肃', '宁夏', '西洱河', '云南'],
                    axisLabel: {
                        inside: true
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
                    show: false
                },
                series: [{ // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#626c91'
                        }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: [100, 100, 100, 100, 100, 100],
                    animation: false
                },
                    {
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: [75, 87, 70, 77, 75, 80]
                    }
                ]
            }
        })
    })

    var right1 = displayview({
        matchParent: true,
        autoFitContent: true,
        padding: [10, 120, 0, 0],
        displayUrl: 'displays/platform/新能源/大屏/安全运维.json',
    })


    var right2 = createRightPanel({
        title: '传感器统计',
        content: echartview({
            matchParent: true,
            background: null,
            theme: 'walden',
            option: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                grid: {
                    top: 20,
                    left: 60,
                    bottom: 0,
                    right: 0,
                    containLabel: true
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['压力', '温度', '应力']
                },
                series: [{
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,

                    label: {

                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },

                    data: [{
                        value: 64.8,
                        name: '压力'
                    },
                        {
                            value: 64.8,
                            name: '温度'
                        },
                        {
                            value: 32.4,
                            name: '应力'
                        }
                    ]
                }]
            }
        }) // echartview end
    })

    var right3 = createRightPanel({
        title: '传感器数据',
        content: displayview({
            matchParent: true,
            autoFitContent: true,
            // padding: [10, 120, 0, 0],
            displayUrl: 'displays/platform/新能源/大屏/节能减排.json',
        })
    })


    var right4 = createRightPanel({
        title: '发电趋势',
        content: echartview({
            matchParent: true,
            theme: 'walden',
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    top: 20,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    containLabel: true
                },
                axisPointer: {
                    link: {
                        xAxisIndex: 'all'
                    },
                    label: {
                        backgroundColor: '#777'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: hours
                },
                yAxis: {
                    type: 'value',
                    // name: 'kW',
                    axisLabel: {
                        formatter: '{value} kW'
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    name: '昨日',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#626c91'
                        }
                    },
                    data: yesterdayData,
                    type: 'line',
                    smooth: true
                },
                    {
                        name: '今日',
                        symbol: 'none',
                        data: todayData,
                        type: 'line',
                        smooth: true
                    }
                ]
            }
        })
    })


    var g3d = new ht.graph3d.GlobalView()
    window.g3d = g3d
    g3d.setEye([0, 500, 1600])
    g3d.setGlobalImage('assets/background/earth-blue.jpg')
    g3d.setLightImage('assets/background/light.png')

    function addWindSite(name, lat, lng) {
        let node = g3d.addNode([lat, lng], {
            width: 64,
            height: 64
        }, 'symbols/industry/新能源/风电站.json')
        node.a('name', name)
        // 如果存在性能问题可以关掉动画，打开cache
        // node.s('shape3d.image.cache', true)
        // node.s('shape3d.vector.dynamic', false)
        node.s('shape3d.image.cache', false)
        node.s('shape3d.vector.dynamic', true)

        setInterval(function () {
            let rotation = node.a('fanRotation')
            if (rotation === undefined) {
                rotation = 0
            }
            node.a('fanRotation', rotation + Math.PI / 50)
        }, 10)
    }

    addWindSite('新疆', 43.45, 87.36)
    addWindSite('甘肃', 36.04, 103.51)
    addWindSite('内蒙古', 40.48, 111.41)

    function addPVSite(name, lat, lng) {
        let node = g3d.addNode([lat, lng], {
            width: 64,
            height: 64
        }, 'symbols/industry/新能源/光伏电站.json')
        node.a('name', name)
        // node.s('shape3d.image.cache', true)
        // node.s('shape3d.vector.dynamic', false)
        node.s('shape3d.image.cache', false)
        node.s('shape3d.vector.dynamic', true)
    }

    addPVSite('新疆', 45.36, 84.51)
    addPVSite('云南', 25.04, 102.42)
    addPVSite('宁夏', 38.27, 106.16)
    addPVSite('江西', 28.40, 115.55)
    addPVSite('江苏', 32.03, 118.46)

    var earthPanel = htview({
        layoutParams: {
            width: 'match_parent',
            height: 'match_parent',
            align: 'center',
            vAlign: 'middle',
            // marginTop: 80,
            // marginLeft: 280,
            // marginRight: 280,
            // marginBottom: 20,
        },
        background: null,
        content: g3d
    })

    var layoutPanel = relativelayout({
        matchParent: true,
        // background: 'rgb(3,11,33)',
        background: 'rgb(3,12,33)',
        children: [
            earthPanel,
            // left
            createTopPanel(),
            vbox({
                layoutParams: {
                    width: 480,
                    height: 'match_parent',
                    align: 'left',
                    vAlign: 'top',
                    marginTop: 40,
                    marginLeft: 20,
                    marginBottom: 20,
                },
                background: null,
                gap: 10,
                children: [left1, left2, left3, left4]
            }),
            vbox({
                layoutParams: {
                    width: 420,
                    height: 'match_parent',
                    align: 'right',
                    vAlign: 'top',
                    marginTop: 40,
                    marginRight: 10,
                    marginBottom: 20,
                },
                background: null,
                gap: 10,
                children: [right1, right2, right3, right4]
            })
            // earthChart
        ]
    })

    layoutPanel.addToDOM()
}