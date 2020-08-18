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
        maxZoom : 6
    });
    var point = new BMap.Point(102.61, 37.94,);  // 创建点坐标
    map.centerAndZoom(point, 5);
    map.enableScrollWheelZoom();

    var circle = new BMap.Circle(point,30000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});//设置覆盖物的参数，中心坐标，半径，颜色
    map.addOverlay(circle);//在地图上显示圆形覆盖物

    var overlay =null;//圆覆盖物
    var label=null;//显示半径信息
    var overlaycomplete = function(e)
    {
        map.addEventListener("click",function(e){
            alert(e.point.lng + "," + e.point.lat);
            //alert(e.point.lng + "," + e.point.lat);
        });
    }

    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 1,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
        fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }

    //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(10, 10), //偏离值,
            drawingModes:[BMAP_DRAWING_MARKER]// 只保留画圆模式
        },
        circleOptions: styleOptions //圆的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);

    drawingManager.prototype._bindCircle();



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

    var index;
    var pArray;
    function dealAreaLine(areaStyle){
        index++;
        $.each(areaStyle, function (infoIndex, info){
            pArray.push(new BMap.Point(info[0],info[1]));
        });
    }


    function drawBoundary(areaStyle) {
        pArray = [];
        index = 0;
        dealAreaLine(areaStyle);
        var sanjiaoxing = new BMap.Polygon(pArray,{strokeWeight: 1, strokeColor: "#ff0000"}); //建立多边形覆盖物
        map.addOverlay(sanjiaoxing);
    }



</script>
</body>
</html>