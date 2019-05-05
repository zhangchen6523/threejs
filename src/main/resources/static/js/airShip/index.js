var dm2d = new ht.DataModel();

var g2d = new ht.graph.GraphView(dm2d);
g2d.handleScroll = function () { };
g2d.isSelectable = function () { return false; };

var setNodeVisible = function (node, visible) {
    if (node.a('visible') === 'hide') {
        node.s('3d.visible', false);
    }
    else if (node.a('visible') === 'reverse') {
        node.s('3d.visible', !visible);
    }
    else if (node.a('visible') === 'ignore') { }
    else {
        node.s('3d.visible', visible);
    }

    node.eachChild(function (c) {
        setNodeVisible(c, visible);
    });
};

var styleMap = {};
var setNodeOpacity = function (node, except, opacity) {
    var transparent = opacity < 1;

    var id = node.getId();
    if (!styleMap[id]) {
        styleMap[id] = ht.Default.clone(node.getStyleMap());
    }

    if (!transparent || node === except) {
        node.setStyleMap(ht.Default.clone(styleMap[id]));
    }
    else {
        node.s({
            'all.transparent': transparent,
            'all.opacity': opacity,
            'left.transparent': transparent,
            'left.opacity': opacity,
            'right.transparent': transparent,
            'right.opacity': opacity,
            'top.transparent': transparent,
            'top.opacity': opacity,
            'bottom.transparent': transparent,
            'bottom.opacity': opacity,
            'front.transparent': transparent,
            'front.opacity': opacity,
            'back.transparent': transparent,
            'back.opacity': opacity,
            'from.transparent': transparent,
            'from.opacity': opacity,
            'to.transparent': transparent,
            'to.opacity': opacity,

            'shape3d.transparent': transparent,
            'shape3d.opacity': opacity
        });
    }

    node.eachChild(function (c) {
        setNodeOpacity(c, except, opacity);
    });
};

var hideAll = function () {
    buildingList.forEach(function (b) {
        setNodeVisible(b, false);
    });

    floorList.forEach(function (f) {
        setNodeVisible(f, false);
    });
};

var fitScene = function () {
    g3d.flyTo(buildingList, {
        animation: true,
        worldDirection: [-0.5086145611178792, 0.44796485138462094, 0.7352813884104654],
        center: [1389.124766110275, 1190.809647904507, 702.6359369689474],
        ratio: 0.6
    });
};

var initData = function () {
    leftPanel.a(source.park);
    rightPanel.a(source.building1);

    buildingList.forEach(function (b) {
        b.a(source[b.getTag()]);
    });

    floorList.forEach(function (f) {
        f.eachChild(function (c) {
            c.a(source[c.getTag()]);
        });
    });
};

var initWarning = function (dm, cabinetList) {
    var len = cabinetList.length;
    var list = [], j;
    for (var i = 0, k = len * (Math.random() * 0.05 + 0.03); i < k; i++) {
        do {
            j = Math.floor(Math.random() * len);
        } while (list.indexOf(j) >= 0);
        list.push(j);
    }

    list.forEach(function (i) {
        var c = cabinetList.get(i);

        var a = new ht.Node();
        a.s({
            "3d.visible": false,
            "3d.movable": false,

            "shape3d": "billboard",
            "shape3d.image": "symbols/build/3d场景用/标签/alarm.json",
            "shape3d.autorotate": true,
            "shape3d.fixSizeOnScreen": false,
            "shape3d.vector.dynamic": true,
            "shape3d.transparent": true,
            "shape3d.blend": Math.random() > 0.4 ? "yellow" : "red"
        });
        a.setParent(c);
        a.setHost(c);
        a.setAnchor3d(0.5, 0, 0.5);
        a.setScale3d(4, 4, 4);
        a.p3(c.getX(), c.getElevation() + c.getTall() + 5, c.getY());
        dm.add(a);
    });
};

var capacityList;
var initCapacity = function(dm, cabinetList) {
    capacityList = dm.a('capacityList');
    if (capacityList) return;

    capacityList = [];
    cabinetList.forEach(function(c) {
        var n = new ht.Node();
        n.setAnchor3d(c.getAnchor3d());
        n.setScale3d(c.getScale3d());
        n.p3(c.p3());

        var k = Math.random();
        var t = k * 42;
        var color = 'red';
        if (t < 15) color = 'blue';
        else if (t <= 30) color = 'yellow';
        else if (t < 42) color = 'orange';

        n.s3(c.getWidth(), c.getTall() * Math.random(), c.getHeight());
        n.a('visible', 'ignore');
        n.s({
            '3d.visible': false,
            '3d.movable': false,

            'all.color': color,
            'all.reverse.cull': true,

            'wf.visible': true,
            'wf.color': 'white'
        });
        n.setParent(c);
        n.setHost(c);
        dm.add(n);

        capacityList.push(n);
    });
};

var cylinderList;
var setCapacityVisible = function(visible) {
    capacityList.forEach(function(c) {
        c.s('3d.visible', visible);

        setNodeVisible(c.getParent(), !visible);
    });

    cylinderList.forEach(function(l) {
        setNodeVisible(l, !visible);
    });
};

var G = {};

G.rootFontSize = 12;
var zoom = g2d.getZoom();
var dataLen = 10;
var areaChartNode = void 0;
var ylChartNode = void 0;

var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var MyEChart = function () {
    function MyEChart(gv, host, option) {
        classCallCheck(this, MyEChart);

        var div = this.div = document.createElement('div');
        this.gv = gv;
        this.host = host;

        div.style.position = 'absolute';
        div.style.boxSizing = 'border-box';
        div.style.zIndex = 100;
        gv.getView().appendChild(div);

        this.chart = echarts.init(div);
        if (option) {
            this.chart.setOption(option);
        }
        gv.fitContent();
        this.layout();

        gv.mp(this.layout, this);
    }

    createClass(MyEChart, [{
        key: 'layout',
        value: function layout() {
            var gv = this.gv,
                host = this.host,
                div = this.div,
                zoom = gv.getZoom(),
                tx = gv.tx(),
                ty = gv.ty(),
                rect = host.getRect(),
                x = void 0,
                y = void 0;


            rect.x *= zoom;
            rect.y *= zoom;
            rect.width *= zoom;
            rect.height *= zoom;

            x = rect.x + tx;
            y = rect.y + ty;

            div.style.width = rect.width + 'px';
            div.style.height = rect.height + 'px';
            div.style.left = x + 'px';
            div.style.top = y + 'px';

            this.chart.resize();
        }
    }, {
        key: 'setOption',
        value: function setOption(o) {
            this.chart.setOption(o);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.div.style.display = 'none';
        }
    }, {
        key: 'show',
        value: function show() {
            this.div.style.display = 'block';
        }
    }]);
    return MyEChart;
}();

var option = {
    color: ['rgb(78,204,252)', 'rgb(184,153,133)'],
    textStyle: {
        color: 'rgb(145,145,145)'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        show: true,
        left: '80%',
        right: 0,
        top: '30%',
        orient: 'vertical',
        data: ['温度', '应力'],
        textStyle: {
            color: 'rgb(145,145,145)',
            fontSize: G.rootFontSize * zoom
        }
    },
    grid: {
        left: '30%',
        right: '20%',
        bottom: 0,
        top: '10%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: function () {
            var res = [];
            for (var i = 1; i <= dataLen; i++) {
                res.push(i);
            }
            return res;
        }(),
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {}
    }],
    yAxis: [{
        type: 'value',
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {}
    }],
    series: [{
        name: '温度',
        type: 'line',
        smooth: true,
        areaStyle: {
            normal: {
                color: 'rgba(32,78,139,0.4)'
            }
        },
        data: [120, 132, 101, 134, 90, 230, 210, 399, 499, 599]
    }, {
        name: '应力',
        type: 'line',
        smooth: true,
        areaStyle: {
            normal: {
                color: 'rgba(252,209,134,0.40)'
            }
        },
        data: [220, 182, 191, 234, 290, 330, 310, 200, 540, 100]
    }]
};

var ylOption = {
    color: ['rgb(78,204,252)', 'rgb(184,153,133)'],
    textStyle: {
        color: 'rgb(145,145,145)'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        show: true,
        left: '80%',
        right: 0,
        top: '30%',
        orient: 'vertical',
        data: ['温度', '应力'],
        textStyle: {
            color: 'rgb(145,145,145)',
            fontSize: G.rootFontSize * zoom
        }
    },
    grid: {
        left: '30%',
        right: '20%',
        bottom: 0,
        top: '10%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: function () {
            var res = [];
            for (var i = 1; i <= dataLen; i++) {
                res.push(i);
            }
            return res;
        }(),
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {}
    }],
    yAxis: [{
        type: 'value',
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {}
    }],
    series: [{
        name: '温度',
        type: 'line',
        smooth: true,
        areaStyle: {
            normal: {
                color: 'rgba(32,78,139,0.4)'
            }
        },
        data: [230, 210, 399, 499, 599,120, 132, 101, 134, 90]
    }, {
        name: '应力',
        type: 'line',
        smooth: true,
        areaStyle: {
            normal: {
                color: 'rgba(252,209,134,0.40)'
            }
        },
        data: [330, 310, 200, 540, 100,220, 182, 191, 234, 290]
    }]
};

var appendData = function appendData() {
    var grl = option.series[0].data,
        whl = option.series[1].data,
        xAxisData = option.xAxis[0].data;
    grl.shift();
    grl.push(Math.floor(Math.random() * 600));
    whl.shift();
    whl.push(Math.floor(Math.random() * 600));

    xAxisData.shift();
    xAxisData.push(++dataLen);
    myChart.setOption(option);
};

var appendylData = function appendData() {
    var grl = ylOption.series[0].data,
        whl = ylOption.series[1].data,
        xAxisData = ylOption.xAxis[0].data;
    grl.shift();
    grl.push(Math.floor(Math.random() * 600));
    whl.shift();
    whl.push(Math.floor(Math.random() * 600));

    xAxisData.shift();
    xAxisData.push(++dataLen);
    ylChart.setOption(ylOption);
};


var startInterval = function startInterval() {
    setInterval(function () {
        appendData();
        appendylData();
    }, 1200);
};

var dmMap = {};
var dm3d = new ht.DataModel();
dmMap['building'] = dm3d;

var g3d = new ht.graph3d.Graph3dView(dm3d);
g3d.getHighlightHelper().mode = 1;
g3d.setFar(1000000);
g3d.isMovable = function () { return false; };
g3d.enablePostProcessing('Fxaa', true);
var htmlNode=null;
var buildingList, floorList;
var leftPanel, rightPanel, capacityNode;
var navigation = ['building'];
var currentRoom, currentCabinet;
var panel=null;
// g3d.mi(function (e) {
//     var kind = e.kind;
//     if (kind === 'clickData') {
//         var data = e.data;
//         var tag = data.getTag();
//
//         if (!tag) {
//             data = data.getParent();
//             tag = data ? data.getTag() : null;
//         }
//
//         if (tag) {
//             if (tag.indexOf('building') >= 0 || tag.indexOf('floor') >= 0) {
//                 rightPanel.a(data.getAttrObject());
//             }
//         }
//
//         return;
//     }
//     console.log(kind)
//     if (kind === 'doubleClickData') {
//     }
//     else if (kind === 'clickBackground') {
//         if(htmlNode!=null) {
//             htmlNode.s('2d.visible', false);
//             dm2d.remove(htmlNode);
//         }
//         if(panel!=null){
//             panel.s('3d.visible', false);
//         }
//         panel=null;
//         htmlNode=null;
//     }
//     if (kind === 'doubleClickBackground') {
//         if (capacityNode.a('capacityVisible')) {
//             capacityNode.s('onDown')({}, capacityNode, g2d);
//         }
//
//         if (g3d.dm().a('cabinetPanel')) {
//             g3d.dm().a('cabinetPanel').s('3d.visible', false);
//         }
//
//         if (navigation.length === 1) return;
//
//         hideAll();
//
//         navigation.pop();
//
//         var data = navigation[navigation.length - 1];
//         if (data === 'building') {
//             rightPanel.a(leftPanel.getAttrObject());
//             leftPanel.a(source.park);
//
//             buildingList.forEach(function (b) {
//                 setNodeVisible(b, true);
//             });
//
//             fitScene();
//
//             return;
//         }
//
//         if (data.indexOf('building') >= 0) {
//             g3d.dm(dm3d);
//
//             var floor = dm3d.getDataByTag('floor' + data.substr('building'.length));
//             setNodeVisible(floor, true);
//
//             //alert(4)
//             console.log(floor.p3())
//             g3d.flyTo(floor, {
//                 animation: true,
//                 worldDirection: [-0.5086145611178792, 0.44796485138462094, 0.7352813884104654],
//                 center: floor.p3(),
//                 ratio: 0.2
//             });
//
//             return;
//         }
//
//         if (data.indexOf('floor') >= 0) {
//             setNodeOpacity(currentRoom, null, 1);
//             currentCabinet = null;
//
//             setNodeVisible(currentRoom, false);
//             currentRoom = null;
//
//             alert(5)
//             g3d.flyTo(null, { animation: true });
//
//             capacityNode.s('2d.visible', false);
//
//             return;
//         }
//
//         if (data.indexOf('room') >= 0) {
//             setNodeOpacity(currentRoom, null, 1);
//             currentCabinet = null;
//
//             alert(6)
//             g3d.flyTo(currentRoom, { animation: true });
//
//             return;
//         }
//
//         return;
//     }
// });



window.addEventListener('load', function () {
    g3d.addToDOM();

    g2d.addToDOM(g3d.getView());

    ht.Default.xhrLoad(['/js/airShip/scenes/main.json', '/js/airShip/displays/jc.json'], function (res) {
        dm3d.deserialize(res[0]);

        buildingList = dm3d.getDataByTag('buildingList').getChildren().toArray();
        floorList = dm3d.getDataByTag('floorList').getChildren().toArray();

        g3d.setSkyBox(dm3d.getDataByTag('skyBox'));

        fitScene();

        dm2d.deserialize(res[1]);

        leftPanel = dm2d.getDataByTag('leftPanel');
        rightPanel = dm2d.getDataByTag('rightPanel');
        capacityNode = dm2d.getDataByTag('capacity');
        capacityNode.s('2d.visible', false);

        initData();


        areaChartNode = g2d.dm().getDataByTag('areaChart');
        myChart = new MyEChart(g2d, areaChartNode, option);

        ylChartNode = g2d.dm().getDataByTag('ylChart');
        ylChart = new MyEChart(g2d, ylChartNode, option);

        startInterval();
    });
});