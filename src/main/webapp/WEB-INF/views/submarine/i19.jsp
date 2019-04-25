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
        .main {
            background: #426AA1;
            margin: 0px;
            padding: 0px;
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
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
        function init(){
            dataModel = new ht.DataModel();
            g3d = new ht.graph3d.Graph3dView(dataModel);

            view = g3d.getView();
            view.className = 'main';
            document.body.appendChild(view);
            window.addEventListener('resize', function (e) {
                g3d.invalidate();
            }, false);

            g3d.setEye([0, 500, 1000]);
            g3d.setCenter([0, 200, 0]);
            g3d.setGridVisible(true);
            g3d.setGridColor('#74AADA');

            loadObj('E1', -600, {r3: [0, Math.PI/2, 0], s3: [2, 1.5, 1]});
        }

        function loadObj(name, x, params){
            params.prefix = 'assets/管道/';
            params.center = true;
            params.cube = true;
            params.shape3d = name;
            params.finishFunc = function(modelMap, array, rawS3){
                var node = new ht.Node();
                node.s({
                    'shape3d': name,
                    'wf.visible': 'selected',
                    'wf.width': 3,
                    'wf.color': '#F7F691'
                });
                node.s3(rawS3);
                node.p3(x, rawS3[1]/2, 0);
                dataModel.add(node);
            };

            ht.Default.loadObj('assets/submarine/i19/i19.obj', 'assets/submarine/i19/i19.mtl', params);
        }
    </script>
</head>
<body onload='setTimeout(init, 300)'>
</body>
</html>