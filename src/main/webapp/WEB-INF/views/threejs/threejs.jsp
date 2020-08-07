<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>threejs</title>
    <meta charset="utf-8">
    <style>
        body {
            /*background: url("assets/objs/transport/textures/back.jpg") center no-repeat;*/
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="model" style="margin: 10px 0px 0px 25%;"></div>
    <div style="margin: 10px 0px 0px 45%;">
        <table border="1" style="color:darkblue;">
            <tr>
                <td>row 1, cell 1</td>
                <td>row 1, cell 2</td>
            </tr>
            <tr>
                <td>row 2, cell 1</td>
                <td>row 2, cell 2</td>
            </tr>
        </table>
    </div>
    <script src="libs/threejs/three.js"></script>
    <script src="libs/threejs/loaders/OBJLoader.js"></script>
    <script src="libs/threejs/loaders/MTLLoader.js"></script>
    <script src="libs/threejs/loaders/GLTFLoader.js"></script>
    <script src="libs/threejs/loaders/RGBELoader.js"></script>
    <script src="libs/threejs/controls/OrbitControls.js"></script>
    <script>
        var camera, scene, renderer;
        var mouseX = 0, mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        init();
        animate();
        function init() {
            // scene
            scene = new THREE.Scene();
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

            draw();

            // //摄像机
            // camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
            // camera.position.x = 0;
            // camera.position.y = 0;
            // camera.position.z = 1000;

            // renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            // // renderer.setClearColor(0xEEEEEE);
            // renderer.setClearAlpha(0.2);
            // renderer.setPixelRatio(window.devicePixelRatio);
            // renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.toneMappingExposure = 1.1;

            var axes = new THREE.AxisHelper(20);
            scene.add(axes);

            //添加环境光
            var ambient = new THREE.AmbientLight(0xffffff);
            scene.add(ambient);
            //
            // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
            // dirLight.position.set(10, 10, 10);
            // scene.add(new THREE.PointLightHelper(dirLight, 1));
            var pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();

            //加载hdr文件
            new THREE.RGBELoader()
                .setDataType(THREE.UnsignedByteType)
                .setPath('assets/objs/transport/textures/')
                .load('Parking_Lot_Sunny.hdr', function (texture) {
                    var envMap = pmremGenerator.fromEquirectangular(texture).texture;
                    //scene.background = envMap;
                    scene.environment = envMap;
                    texture.dispose();
                    pmremGenerator.dispose();
                    //加载obj和mtl文件
                    //loadMtl();
                    //加载gltf文件
                    loadGltf();
                });

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.getElementById("model").addEventListener('dblclick', mouseDblclick, false);
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth/2, window.innerHeight/2);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX ) / 2;
            mouseY = (event.clientY - windowHalfY ) / 2;
        }

        function draw(){
            var Models = document.getElementById('model');

            camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100);
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 100;
            camera.lookAt(scene.position);

            // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
            renderer.setClearAlpha(0.2);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth/2, window.innerHeight/2);
            renderer.toneMappingExposure = 1.1;

            renderer.render(scene, camera);
            var controls = new THREE.OrbitControls(camera,renderer.domElement);
            controls.autoRotate = true;// 设置平面自动旋转
            Models.appendChild(renderer.domElement);
        }

        function mouseDblclick(){
            draw();
        }


        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }

        function loadMtl(){
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('assets/objs/transport/');
            mtlLoader.load('transport.mtl', function(materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('assets/objs/transport/');
                objLoader.load('transport.obj', function(object) {
                    object.scale.set(0.005, 0.005, 0.005);
                    object.translateZ(130);
                    object.translateY(-70);
                    object.translateX(-20);
                    scene.add(object);
                }, onProgress, onError);
            });
        }

        function loadGltf(){
            var loder=new THREE.GLTFLoader();
            loder.load("assets/objs/transport/source/model.glb",function (obj) {
                //获取模型，并添加到场景
                var modelScene=obj.scene;
                // modelScene.scale.set(0.01, 0.01, 0.01);
                // modelScene.rotateY(93);
                scene.add(modelScene);
            }, onProgress, onError);
        }

        function onProgress( xhr ) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }

        function onError( xhr ) {
            console.log( 'model ' + xhr + 'downloaded' );
        }
    </script>
</body>
</html>