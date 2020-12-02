<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>gas 3d</title>
    <meta charset="UTF-8">
    <!--<link rel="shortcut icon" href="custom/images/favicon.ico?v=2" />-->
    <style>
        html, body {
            padding: 0px;
            margin: 0px;
        }
    </style>
    <script>
        //通过全局样式设置 去掉默认选中样式（去掉绿色边框）
        window.htconfig = {
            Style: {
                'select.width': 0
            }
        }
    </script>
    <!--<script src='../custom/configs/htconfig.js'></script>-->
    <script src='guide/lib/core/ht.js'></script>
    <script src='libs/ht-ui.js'></script>
    <script src='libs/ht-edgetype.js'></script>
    <script src='libs/ht-obj.js'></script>
    <script src='libs/ht-vector.js'></script>
    <script src="libs/ht-animation.js"></script>
    <script>
        function init() {
            dataModel = new ht.DataModel()
            graphView = new ht.graph.GraphView(dataModel)
            graphView.addToDOM()
            graphView.setRectSelectable(false)
            graphView.setMovableFunc(function(data) { return false })
            window.addEventListener('resize', function(e) { graphView.fitContent() }, false)

            ht.Default.xhrLoad('js/gasPipeline/display/3d/主界面.json', function(text) {
                var json = ht.Default.parse(text)
                if (json.title) document.title = json.title
                dataModel.deserialize(json)
                graphView.fitContent(true)

                // 更新日期和时间
                var day = dataModel.getDataByTag('时间')
                day.timer = setInterval(function(){
                    // day.a('date', new Date().toLocaleDateString())
                    day.a('date', new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate())
                    day.a('time', new Date().toLocaleTimeString('chinese', { hour12: false }))
                    day.a('week', "星期" + "日一二三四五六".charAt(new Date().getDay()))
                    if (!day.dm()) {
                        clearInterval(day.timer)
                    }
                }, 1000)

            })
        }
    </script>
</head>
<body onload='setTimeout(init, 300)'>
</body>
</html>