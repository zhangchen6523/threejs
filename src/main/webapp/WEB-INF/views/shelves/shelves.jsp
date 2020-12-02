<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head lang='zh-cn'>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
    <!-- 样式文件 -->
    <link href="css/weather-icons.min.css" rel="stylesheet">
    <!-- echarts -->
    <script src="libs/echarts/echarts.common.min.js"></script>
    <script src='libs/echarts/walden.js'></script>
    <script src='libs/EventEmitter.min.js'></script>
    <script src="libs/polyfill.min.js"></script>

    <!-- <script src="http://www.hightopo.com/guide/lib/core/ht.js"></script> -->
    <script src="guide/lib/core/ht.js"></script>
    <!-- <script src="libs/ht.js"></script> -->
    <script src="libs/ht-obj.js"></script>
    <script src="libs/ht-ui.js"></script>
    <script src="libs/ht-ui-framework.js"></script>
    <script src="libs/ht-ui-mvvm.min.js"></script>
    <script src="libs/ht-ui-dsl.min.js"></script>
    <script src="libs/ht-vector.js"></script>
    <script src="libs/plugin/ht-postprocessing.js"></script>
    <script>
        var g3d = new ht.graph3d.Graph3dView();
        g3d.isMovable = function() { return false; };
        g3d.setEye([4283.091266924708, 1860.9457765881016, 2271.2659660380273]);
        g3d.setCenter([-300.7927027080411, 57.74110989479448, -140.76956591688793]);
        g3d.setFar(100000);

        var dm = g3d.dm();
        ht.Default.xhrLoad('js/shelves/scenes/仓库demo.json', function(json) {
            dm.deserialize(json);
        });

        window.addEventListener('load', function() {
            g3d.addToDOM();
        });
    </script>
</head>

<body>
</body>

</html>
