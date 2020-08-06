<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>threejs</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

</head>
<body onload="init()">
     <canvas id="mainCanvas" ></canvas>
    <script src="libs/threejs/three.js"></script>
    <script src="libs/threejs/loaders/OBJLoader.js"></script>
    <script src="libs/threejs/controls/OrbitControls.js"></script>
    <script>
        var scene = null;
        var camera = null;
        var renderer = null;

        var mesh = null;
        var id = null;

        function init() {
            renderer = new THREE.WebGLRenderer({//渲染bai器
                canvas: document.getElementById('mainCanvas')//画布
            });
            renderer.setClearColor(0x000000);//画布颜色
            scene = new THREE.Scene();//创建场景du

            camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);//正交投影照相机zhi
            camera.position.set(15, 25, 25);//相机位置dao
            camera.lookAt(new THREE.Vector3(0, 2, 0));//lookAt()设置相机所看的位置
            scene.add(camera);//把相机添加到场景中

            var loader = new THREE.OBJLoader();//在init函数中，创建loader变量，用于导入模型
            loader.load('assets/objs/transport/cube.obj', function(obj) {//第一个表示模型路径，第二个表示完成导入后的回调函数，一般我们需要在这个回调函数中将导入的模型添加到场景中
                // obj.traverse(function(child) {
                //     if (child instanceof THREE.Mesh) {
                //         child.material.side = THREE.DoubleSide;
                //     }
                // });
                //
                // mesh = obj;//储存到全局变量中
                scene.add(obj);//将导入的模型添加到场景中
            });

            var light = new THREE.DirectionalLight(0xffffff);//光源颜色
            light.position.set(20, 10, 5);//光源位置
            scene.add(light);//光源添加到场景中

            id = setInterval(draw, 20);//每隔20s重绘一次
        }

        function draw() {//们在重绘函数中让茶壶旋转：
            renderer.render(scene, camera);//调用WebGLRenderer的render函数刷新场景

            mesh.rotation.y += 0.01;//添加动画
            if (mesh.rotation.y > Math.PI * 2) {
                mesh.rotation.y -= Math.PI * 2;
            }
        }
    </script>
</body>
</html>