<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>threejs</title>
    <meta charset="utf-8">
</head>
<body>
<div id="model"></div>
<script src="libs/threejs/three.js"></script>
<script src="libs/threejs/loaders/OBJLoader.js"></script>
<script src="libs/threejs/loaders/MTLLoader.js"></script>
<script src="libs/threejs/loaders/GLTFLoader.js"></script>
<script src="libs/threejs/loaders/RGBELoader.js"></script>
<script src="libs/threejs/controls/OrbitControls.js"></script>
<script src="libs/threejs/postprocessing/EffectComposer.js"></script>
<script src="libs/threejs/postprocessing/ShaderPass.js"></script>
<script src="libs/threejs/postprocessing/OutlinePass.js"></script>
<script src="libs/threejs/postprocessing/RenderPass.js"></script>
<script src="libs/threejs/shader/CopyShader.js"></script>

<script>
    var camera, scene, renderer, controls;
    //https://threejs.org/editor/直接使用

    init();
    animate();

    //没有描边的处理方法
    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    //创建辅助坐标，调整模型位置打开
    function initAxes() {
        var axes = new THREE.AxisHelper(20);
        scene.add(axes);
    }

    //创建摄像机
    function initCamera() {
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 1000);
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 130;
        camera.lookAt(scene.position);
    }

    //创建渲染器
    function initRenderer() {
        // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));//添加背景颜色
        renderer.setClearAlpha(0.2);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.toneMappingExposure = 1.1;//曝光度
        renderer.outputEncoding = THREE.sRGBEncoding;//切换rgb模式输出，模型变亮

        renderer.render(scene, camera);
    }

    //创建控制器
    function initControls() {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;// 设置平面自动旋转
    }

    //加载Mtl模型方法
    function loadMtl(){
        var loder=new THREE.MTLLoader();
        var path = 'assets/objs/airShip/';
        loder.setPath(path);
        loder.load("airShip.mtl",function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(path);
            objLoader.load('airShip.obj', function(object) {
                object.scale.set(8, 8, 8);
                object.translateX(-20);//沿着x轴正方向平移距离100
                // object.rotateY(-Math.PI/2);
                // var box = new THREE.Box3();
                // box.expandByObject(object);
                // var length = box.max.x - box.min.x;
                // alert(length);
                scene.add(object);

            }, onProgress, onError);
        }, onProgress, onError);
    }

    function init() {
        // scene
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        var models = document.getElementById('model');
        initLight();
        initCamera();
        initRenderer();
        initControls();
        // initModelOutline();
        models.appendChild(renderer.domElement);

        initAxes();
        loadMtl();

        document.getElementById("model").addEventListener('dblclick', mouseDblclick, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    //添加光
    var ambientLight,pointLight;
    function initLight() {
        ambientLight = new THREE.AmbientLight("#ffffff",2);
        scene.add(ambientLight);

        pointLight = new THREE.PointLight("#ffffff",2);
        pointLight.position.set(100, 100, 100);
        scene.add(pointLight);
    }

    function mouseDblclick(){
        controls.reset();//回归相机初始视角，将模型归位
    }

    function animate() {
        // composer.render();
        render();
        requestAnimationFrame(animate);

    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth , window.innerHeight);
    }

    function onProgress( xhr ) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round(percentComplete, 2) + '% downloaded' );
        }
    }

    function onError( xhr ) {
        console.log( 'model ' + xhr + 'downloaded' );
    }
</script>
</body>
</html>