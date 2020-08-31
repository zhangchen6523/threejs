<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
	<style type="text/css">
		body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=pQe8vA85kmMSrF94oMmaSEXSa6q2629A"></script>
    <script type="text/javascript" src="libs/FileSaver.js"></script>
    <script type="text/javascript" src="libs/map/jquery-3.5.1.js"></script>
	<title>添加行政区划</title>
</head>
<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">

    //百度地图API功能
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
    map.enableScrollWheelZoom();
    map.disableBizAuthLogo(); //关闭

    $(document).ready(function(){
        $.getJSON("libs/map/data/areaData.json", function (dataList){
            $.each(dataList, function (infoIndex, info){
                getBoundary(info["name"],info["cnname"])
            });
        });
    });

	function getBoundary(name,cnname){
		var bdary = new BMap.Boundary();
		bdary.get(cnname, function(rs){       //获取行政区域
			var count = rs.boundaries.length; //行政区域的点有多少个
			for (var i = 0; i < 1; i++) {
                var file = new File(["var " + name +" = \""+rs.boundaries[i] + "\";"], name+ ".js", {type: "text/plain;charset=utf-8"});
                saveAs(file);
				// var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
				// map.addOverlay(ply);  //添加覆盖物
			}
		});
	}
</script>
