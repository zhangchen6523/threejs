<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta charset="utf-8">
    <title>离线</title>
    <style type="text/css">
        html{height:100%}
        body{height:100%;margin:0px;padding:0px}
        #container{height:100%;}
    </style>

    <script type="text/javascript" src="libs/map/map_load.js"></script>
    <script type="text/javascript" src="libs/map/jquery-3.5.1.js"></script>
    <script type="text/javascript" src="libs/map/mapv.js"></script>

    <script type="text/javascript" src="libs/map/DrawingManager_min.js"></script>
    <link rel="stylesheet" href="libs/map/DrawingManager_min.css" />
</head>
<body>
<div id="container"></div>
<script type="text/javascript">
    var map = new BMap.Map("container" ,{
        minZoom : 5,
        maxZoom : 11
    });
    var point = new BMap.Point(102.61, 37.94,);  // 创建点坐标
    map.centerAndZoom(point, 5);
    map.enableScrollWheelZoom();

    var overlay =null;//圆覆盖物
    var label=null;//显示半径信息
    var overlaycomplete = function(e)
    {
        // //圆完成后清除地图上的覆盖物
        // centerPoint=null;
        // overlay=e.overlay;
        // map.removeOverlay(label);
        // map.removeOverlay(overlay);
    }

    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }

    //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值,
            drawingModes:[BMAP_DRAWING_CIRCLE ]// 只保留画圆模式
        },
        circleOptions: styleOptions //圆的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    // var centerPoint=null;//圆心
    // map.addEventListener("mousemove", showInfo);
    // /**
    //  * 监听鼠标移动事件
    //  */
    // function showInfo(e){
    //     //判断当前是画圆的模式
    //     if(drawingManager._mask!=null)
    //     {
    //         drawingManager._mask.addEventListener('mousedown', getCenter);
    //         map.removeEventListener("mousemove", showInfo);
    //     }
    // }
    // /**
    //  * 得到当前圆的圆心坐标
    //  */
    // var getCenter = function (e) {
    //     if (centerPoint == null) {
    //         centerPoint=e.point;
    //         drawingManager._mask.addEventListener("mousemove", showRadis);
    //     }
    // }
    //
    // /**
    //  * 实时显示半径
    //  */
    // var showRadis= function (e)
    // {
    //     var radius=drawingManager._map.getDistance(centerPoint, e.point);
    //     if(!isNaN(radius))
    //     {
    //         map.removeOverlay(label); //取消上一个显示半径的label
    //         //添加文字标签
    //         var opts = {
    //             position : e.point,    // 指定文本标注所在的地理位置（当前鼠标的位置）
    //             offset   : new BMap.Size(0, 0)    //设置文本偏移量
    //         }
    //         label = new BMap.Label("当前半径："+(radius/1000).toFixed(2)+"公里", opts);  // 创建文本标注对象
    //         label.setStyle({
    //             border:"1px solid #ccc",
    //             maxWidth: "none ",
    //         });
    //         map.addOverlay(label);//添加label
    //     }
    // }


    $(document).ready(function(){
        $(".anchorBL").hide();

        var areasMap = new Map();
        var siteMap = new Map();
        $.getJSON("libs/map/areas.json", function (dataList){
            $.each(dataList, function (infoIndex, info){
                areasMap.set(info["name"],info);
            });
            $.getJSON("libs/map/siteareas.json", function (dataList){
                $.each(dataList, function (infoIndex, info){
                    var area = areasMap.get(info["name"]);
                    info.longitude = area.longitude;
                    info.latitude = area.latitude;
                    var point = new BMap.Point(info.longitude, info.latitude);  // 创建点坐标
                    var marker=new BMap.Marker(point,{icon:new BMap.Icon("libs/map/images/user.png", new BMap.Size(12, 12))});
                    initTip(marker,info);
                    map.addOverlay(marker);
                });
            });
        });



        function initTip(marker,info){
            var steelContent = '<div><p style="margin:0;line-height:1.5;font-size:13px;text-indent:2em"><br/>经度：'+info.longitude+'<br/>纬度：'+info.latitude+
                '<br/>'+info.realname+'</p></div>';
            var steelOpts = {
                width : 260,     //信息窗口宽度
                height: 200,     //信息窗口高度
                title : "<b>场站信息</b>" , //信息窗口标题
                enableMessage:true	//设置允许信息窗发送短息
            };
            //添加鼠标滑过时打开自定义信息窗口事件
            marker.addEventListener("mouseover",function () {
                    this.openInfoWindow(new BMap.InfoWindow(steelContent, steelOpts));
                }
            );

            //添加鼠标离开时关闭自定义信息窗口事件
            marker.addEventListener("mouseout",function () {
                    this.closeInfoWindow();
                }
            );
        }

    });

    function drawBoundary() {

        /*画遮蔽层的相关方法
        *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
        *      这样就做出了一个经过多次西北角的闭合多边形*/
        //定义中国东南西北端点，作为第一层
        //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
        var pStart = new BMap.Point(180,90);
        var pEnd = new BMap.Point(0,-90);
        var pArray = [
            new BMap.Point(pStart.lng,pStart.lat),
            new BMap.Point(pEnd.lng,pStart.lat),
            new BMap.Point(pEnd.lng,pEnd.lat),
            new BMap.Point(pStart.lng,pEnd.lat)];
        //循环添加各闭合区域
        pArray.push(new BMap.Point(135.077218,48.544352));
        pArray.push(new BMap.Point(134.92218,48.584352))
        pArray.push(new BMap.Point(134.827218,48.534352))
        pArray.push(new BMap.Point(134.727669,48.495377));
        pArray.push(new BMap.Point(134.304531,48.394091));
        pArray.push(new BMap.Point(133.513447,48.177476));
        pArray.push(new BMap.Point(132.832747,48.054205));
        pArray.push(new BMap.Point(132.519993,47.789172));
        pArray.push(new BMap.Point(131.765704,47.813962));
        pArray.push(new BMap.Point(131.103402,47.776772));
        pArray.push(new BMap.Point(130.919429,48.331824));
        pArray.push(new BMap.Point(130.77225,48.868729));
        pArray.push(new BMap.Point(129.907577,49.351849));
        pArray.push(new BMap.Point(128.73015,49.699156));
        pArray.push(new BMap.Point(127.791888,49.85404));
        pArray.push(new BMap.Point(127.791888,50.492084));
        pArray.push(new BMap.Point(126.927215,51.616759));
        pArray.push(new BMap.Point(126.467283,52.579818));
        pArray.push(new BMap.Point(125.952158,53.059077));
        pArray.push(new BMap.Point(124.701142,53.313247));
        pArray.push(new BMap.Point(123.56051,53.664362));
        pArray.push(new BMap.Point(121.555204,53.46722));
        pArray.push(new BMap.Point(120.340983,53.125528));
        pArray.push(new BMap.Point(119.95464,52.579818));
        pArray.push(new BMap.Point(120.616942,52.523746));
        pArray.push(new BMap.Point(120.506559,52.095236));
        pArray.push(new BMap.Point(119.862653,51.616759));
        pArray.push(new BMap.Point(119.365926,50.959196));
        pArray.push(new BMap.Point(119.089967,50.362806));
        pArray.push(new BMap.Point(119.108364,50.05583));
        pArray.push(new BMap.Point(118.133307,49.925357));
        pArray.push(new BMap.Point(117.471005,49.794528));
        pArray.push(new BMap.Point(116.808702,49.889712));
        pArray.push(new BMap.Point(116.385564,49.758785));
        pArray.push(new BMap.Point(115.962426,48.953617));
        pArray.push(new BMap.Point(115.520891,48.147476));
        pArray.push(new BMap.Point(115.796851,47.677465));
        pArray.push(new BMap.Point(116.27518,47.652609));
        pArray.push(new BMap.Point(117.103059,47.652609));
        pArray.push(new BMap.Point(118.004526,47.801568));
        pArray.push(new BMap.Point(118.887596,47.577968));
        pArray.push(new BMap.Point(119.402721,47.127871));
        pArray.push(new BMap.Point(119.402721,46.800397));
        pArray.push(new BMap.Point(118.464459,46.825659));
        pArray.push(new BMap.Point(117.103059,46.648575));
        pArray.push(new BMap.Point(115.980824,46.088213));
        pArray.push(new BMap.Point(115.226534,45.702829));
        pArray.push(new BMap.Point(114.159491,45.275796));
        pArray.push(new BMap.Point(112.761297,45.171782));
        pArray.push(new BMap.Point(111.639061,45.132727));
        pArray.push(new BMap.Point(111.436691,44.55683));
        pArray.push(new BMap.Point(111.51028,44.001703));
        pArray.push(new BMap.Point(110.682402,43.387647));
        pArray.push(new BMap.Point(108.897864,42.658724));
        pArray.push(new BMap.Point(106.892559,42.522781));
        pArray.push(new BMap.Point(103.82021,42.140555));
        pArray.push(new BMap.Point(102.422016,42.536389));
        pArray.push(new BMap.Point(101.336575,42.82146));
        pArray.push(new BMap.Point(99.478448,42.929712));
        pArray.push(new BMap.Point(97.601924,42.997272));
        pArray.push(new BMap.Point(96.019756,43.815487));
        pArray.push(new BMap.Point(92.72664,45.288784));
        pArray.push(new BMap.Point(91.144473,45.599605));
        pArray.push(new BMap.Point(91.457227,46.483616));
        pArray.push(new BMap.Point(90.794924,47.553064));
        pArray.push(new BMap.Point(89.562305,48.221295));
        pArray.push(new BMap.Point(88.2377,48.953617));
        pArray.push(new BMap.Point(87.722576,49.279683));
        pArray.push(new BMap.Point(87.097067,49.255604));
        pArray.push(new BMap.Point(86.60034,49.122957));
        pArray.push(new BMap.Point(86.177203,48.710696));
        pArray.push(new BMap.Point(85.533297,48.344091));
        pArray.push(new BMap.Point(85.404516,47.875888));
        pArray.push(new BMap.Point(85.349324,47.390897));
        pArray.push(new BMap.Point(84.926186,47.215692));
        pArray.push(new BMap.Point(83.233635,47.315881));
        pArray.push(new BMap.Point(82.865689,47.328391));
        pArray.push(new BMap.Point(82.258578,45.844449));
        pArray.push(new BMap.Point(82.368962,45.366651));
        pArray.push(new BMap.Point(82.093003,45.30177));
        pArray.push(new BMap.Point(80.989165,45.275796));
        pArray.push(new BMap.Point(79.903724,45.015402));
        pArray.push(new BMap.Point(80.326862,44.332772));
        pArray.push(new BMap.Point(80.510835,43.642047));
        pArray.push(new BMap.Point(80.621219,43.186043));
        pArray.push(new BMap.Point(80.27167,43.010775));
        pArray.push(new BMap.Point(79.885327,42.304653));
        pArray.push(new BMap.Point(79.259819,41.838593));
        pArray.push(new BMap.Point(78.487133,41.576647));
        pArray.push(new BMap.Point(77.916816,41.341363));
        pArray.push(new BMap.Point(77.272911,41.16086));
        pArray.push(new BMap.Point(76.739389,41.02167));
        pArray.push(new BMap.Point(76.26106,40.546202));
        pArray.push(new BMap.Point(75.672346,40.75639));
        pArray.push(new BMap.Point(74.881262,40.630357));
        pArray.push(new BMap.Point(74.255754,40.293095));
        pArray.push(new BMap.Point(73.777425,39.939968));
        pArray.push(new BMap.Point(73.74063,39.556517));
        pArray.push(new BMap.Point(73.53826,39.34256));
        pArray.push(new BMap.Point(73.685438,38.725549));
        pArray.push(new BMap.Point(74.034987,38.407771));
        pArray.push(new BMap.Point(74.458125,38.335352));
        pArray.push(new BMap.Point(74.734084,38.074036));
        pArray.push(new BMap.Point(74.844468,37.577865));
        pArray.push(new BMap.Point(74.678892,37.21089));
        pArray.push(new BMap.Point(74.6237,36.975076));
        pArray.push(new BMap.Point(75.414784,36.501232));
        pArray.push(new BMap.Point(75.801127,35.934721));
        pArray.push(new BMap.Point(76.518622,35.379154));
        pArray.push(new BMap.Point(77.309706,35.137703));
        pArray.push(new BMap.Point(77.972008,34.758986));
        pArray.push(new BMap.Point(78.376749,34.241106));
        pArray.push(new BMap.Point(78.523927,33.473647));
        pArray.push(new BMap.Point(78.7079,32.978834));
        pArray.push(new BMap.Point(78.450338,32.745921));
        pArray.push(new BMap.Point(78.30316,32.340745));
        pArray.push(new BMap.Point(78.431941,32.04349));
        pArray.push(new BMap.Point(78.671106,31.572152));
        pArray.push(new BMap.Point(78.855079,31.145879));
        pArray.push(new BMap.Point(79.425395,30.797108));
        pArray.push(new BMap.Point(80.087697,30.447053));
        pArray.push(new BMap.Point(81.301919,29.855455));
        pArray.push(new BMap.Point(81.90903,30.0157));
        pArray.push(new BMap.Point(82.7921,29.485907));
        pArray.push(new BMap.Point(84.539843,28.661613));
        pArray.push(new BMap.Point(85.71727,28.124721));
        pArray.push(new BMap.Point(86.821108,27.732537));
        pArray.push(new BMap.Point(87.998535,27.69979));
        pArray.push(new BMap.Point(88.568851,27.716165));
        pArray.push(new BMap.Point(88.863208,27.108656));
        pArray.push(new BMap.Point(89.580703,27.190949));
        pArray.push(new BMap.Point(89.654292,27.765274));
        pArray.push(new BMap.Point(90.923705,27.650651));
        pArray.push(new BMap.Point(91.751584,27.223849));
        pArray.push(new BMap.Point(92.04594,26.778874));
        pArray.push(new BMap.Point(92.965805,26.646689));
        pArray.push(new BMap.Point(93.830478,26.960375));
        pArray.push(new BMap.Point(94.860727,27.453873));
        pArray.push(new BMap.Point(96.185332,27.798001));
        pArray.push(new BMap.Point(97.123594,27.503101));
        pArray.push(new BMap.Point(97.620321,27.896122));
        pArray.push(new BMap.Point(97.675513,28.059457));
        pArray.push(new BMap.Point(98.080254,27.306056));
        pArray.push(new BMap.Point(98.595378,27.009824));
        pArray.push(new BMap.Point(98.393008,26.066566));
        pArray.push(new BMap.Point(97.804294,25.483523));
        pArray.push(new BMap.Point(97.528335,24.847254));
        pArray.push(new BMap.Point(97.417951,24.10637));
        pArray.push(new BMap.Point(97.804294,23.717348));
        pArray.push(new BMap.Point(98.595378,23.886634));
        pArray.push(new BMap.Point(98.834543,23.123105));
        pArray.push(new BMap.Point(99.239283,22.697005));
        pArray.push(new BMap.Point(99.165694,22.303805));
        pArray.push(new BMap.Point(99.386462,21.857966));
        pArray.push(new BMap.Point(100.251135,21.445169));
        pArray.push(new BMap.Point(100.839848,21.290063));
        pArray.push(new BMap.Point(101.704521,21.031186));
        pArray.push(new BMap.Point(102.05407,21.152053));
        pArray.push(new BMap.Point(101.998878,21.582901));
        pArray.push(new BMap.Point(101.962083,22.132497));
        pArray.push(new BMap.Point(102.587591,22.355156));
        pArray.push(new BMap.Point(103.599443,22.338041));
        pArray.push(new BMap.Point(104.482513,22.560368));
        pArray.push(new BMap.Point(105.383981,22.799392));
        pArray.push(new BMap.Point(106.083078,22.59454));
        pArray.push(new BMap.Point(106.469421,22.286683));
        pArray.push(new BMap.Point(106.874162,21.754879));
        pArray.push(new BMap.Point(107.315697,21.514051));
        pArray.push(new BMap.Point(107.812424,21.410715));
        pArray.push(new BMap.Point(107.775629,21.134792));
        pArray.push(new BMap.Point(106.929353,20.269201));
        pArray.push(new BMap.Point(106.175064,19.17158));
        pArray.push(new BMap.Point(106.377435,18.470789));
        pArray.push(new BMap.Point(107.297299,17.23746));
        pArray.push(new BMap.Point(109.008248,15.675143));
        pArray.push(new BMap.Point(109.688948,13.705222));
        pArray.push(new BMap.Point(109.652153,11.664031));
        pArray.push(new BMap.Point(108.750686,9.571001));
        pArray.push(new BMap.Point(108.198767,6.876803));
        pArray.push(new BMap.Point(108.493124,5.090099));
        pArray.push(new BMap.Point(109.817729,3.612656));
        pArray.push(new BMap.Point(111.10554,3.298351));
        pArray.push(new BMap.Point(114.71141,5.514272));
        pArray.push(new BMap.Point(116.256783,7.556636));
        pArray.push(new BMap.Point(118.758815,10.883133));
        pArray.push(new BMap.Point(119.531502,13.669242));
        pArray.push(new BMap.Point(119.494707,16.617614));
        pArray.push(new BMap.Point(120.414572,18.961654));
        pArray.push(new BMap.Point(121.51841,20.633358));
        pArray.push(new BMap.Point(122.751029,22.303805));
        pArray.push(new BMap.Point(123.247756,23.378111));
        pArray.push(new BMap.Point(124.811526,25.68375));
        pArray.push(new BMap.Point(126.577667,25.900278));
        pArray.push(new BMap.Point(127.479134,26.67975));
        pArray.push(new BMap.Point(128.454191,28.189945));
        pArray.push(new BMap.Point(128.766945,29.93561));
        pArray.push(new BMap.Point(128.73015,31.650877));
        pArray.push(new BMap.Point(127.957464,32.153119));
        pArray.push(new BMap.Point(127.221572,32.745921));
        pArray.push(new BMap.Point(127.019202,33.596907));
        pArray.push(new BMap.Point(125.988953,33.827543));
        pArray.push(new BMap.Point(125.731391,34.546135));
        pArray.push(new BMap.Point(125.878569,35.454458));
        pArray.push(new BMap.Point(125.731391,36.634799));
        pArray.push(new BMap.Point(125.80498,37.51927));
        pArray.push(new BMap.Point(124.425183,37.972159));
        pArray.push(new BMap.Point(124.498772,38.58128));
        pArray.push(new BMap.Point(125.013896,39.242487));
        pArray.push(new BMap.Point(124.590758,39.471014));
        pArray.push(new BMap.Point(124.296402,39.840762));
        pArray.push(new BMap.Point(124.388388,40.081441));
        pArray.push(new BMap.Point(124.940307,40.335346));
        pArray.push(new BMap.Point(125.731391,40.630357));
        pArray.push(new BMap.Point(126.448885,40.96591));
        pArray.push(new BMap.Point(126.798434,41.493704));
        pArray.push(new BMap.Point(127.111188,41.410654));
        pArray.push(new BMap.Point(127.883875,41.271998));
        pArray.push(new BMap.Point(128.490985,41.452192));
        pArray.push(new BMap.Point(128.307012,41.879854));
        pArray.push(new BMap.Point(128.950918,41.921089));
        pArray.push(new BMap.Point(129.484439,42.12686));
        pArray.push(new BMap.Point(129.999564,42.549994));
        pArray.push(new BMap.Point(130.073153,42.807915));
        pArray.push(new BMap.Point(130.404304,42.495557));
        pArray.push(new BMap.Point(130.77225,42.359256));
        pArray.push(new BMap.Point(130.698661,42.726583));
        pArray.push(new BMap.Point(131.195388,42.848541));
        pArray.push(new BMap.Point(131.360964,43.494895));
        pArray.push(new BMap.Point(131.342566,44.491021));
        pArray.push(new BMap.Point(131.820896,45.002351));
        pArray.push(new BMap.Point(132.998323,44.976239));
        pArray.push(new BMap.Point(133.623831,45.599605));
        pArray.push(new BMap.Point(134.102161,46.394582));
        pArray.push(new BMap.Point(134.37812,47.228226));
        pArray.push(new BMap.Point(134.874847,47.851127));
        pArray.push(new BMap.Point(134.985231,48.233588));
        pArray.push(new BMap.Point(135.13241,48.454352));
        pArray.push(new BMap.Point(135.077218,48.474352));

        //添加遮蔽层
        var plyall = new BMap.Polygon(pArray,
            { strokeOpacity: 1, strokeColor: "#091934",
                strokeWeight: 1, fillColor: "#091934",fillOpacity: 1 }); //建立多边形覆盖物
        map.addOverlay(plyall);

        pStart = new BMap.Point(180,90);
        pEnd = new BMap.Point(0,-90);
        pArray = [
            new BMap.Point(135.077218,48.454352),
            new BMap.Point(pStart.lng,pStart.lat),
            new BMap.Point(pStart.lng,pEnd.lat),
            new BMap.Point(135.077218,48.454352)];
        var sanjiaoxing = new BMap.Polygon(pArray,
            { strokeOpacity: 1, strokeColor: "#091934",
                strokeWeight: 1, fillColor: "#091934",fillOpacity: 1}); //建立多边形覆盖物
        map.addOverlay(sanjiaoxing);
    }
    // setTimeout(function () {
    //     drawBoundary();
    // }, 1000);



</script>
</body>
</html>