<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>threejs</title>
    <meta charset="utf-8">
    <style>
        body {
            overflow: hidden;
        }
    </style>
</head>
<body>
<div id="model" style="margin: 10px 0px 0px 25%;"></div>
<div style="margin: 10px 0px 0px 35%;">
    <table border="1" style="color:darkblue;font-size: 23px;font-family: sans-serif">
        <tr>
            <td>运输介质信息</td>
            <td>运输货物信息</td>
        </tr>
        <tr>
            <td>编号：DF-01654</td>
            <td>编号：鹰击-36</td>
        </tr>
        <tr>
            <td>状态：运行中</td>
            <td>类型：空空</td>
        </tr>
        <tr>
            <td>开始：2018-05-03 00:01</td>
            <td>重量：200KG</td>
        </tr>
        <tr>
            <td>预计结束：2018-05-03 10:01</td>
            <td>容积：900*100*500(MM)</td>
        </tr>
        <tr>
            <td>载重：100吨</td>
            <td></td>
        </tr>
        <tr>
            <td>装载数量：8箱</td>
            <td></td>
        </tr>
    </table>
</div>
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
    var camera, scene, renderer, envMap;
    var composer, outlinePass;
    var selectedObjects;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
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
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 130;
        camera.lookAt(scene.position);
    }

    //创建渲染器
    function initRenderer() {
        // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));//添加背景颜色
        renderer.setClearAlpha(0.2);
        renderer.setSize(window.innerWidth /2, window.innerHeight / 2);
        // renderer.toneMappingExposure = 1.1;//曝光度
        renderer.outputEncoding = THREE.sRGBEncoding;//切换rgb模式输出，模型变亮

        renderer.render(scene, camera);
    }

    //创建控制器
    function initControls() {
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;// 设置平面自动旋转
    }

    //添加hdr环境光文件和模型
    function loadHdrAndModel() {
        var pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        //加载hdr文件
        new THREE.RGBELoader()
            .setDataType(THREE.UnsignedByteType)
            .setPath('assets/objs/transport/textures/')
            .load('Sky.hdr', function (texture) {
                envMap = pmremGenerator.fromEquirectangular(texture).texture;
                //scene.background = envMap;
                scene.environment = envMap;
                texture.dispose();
                pmremGenerator.dispose();
                //加载obj和mtl文件
                //loadMtl();
                //加载gltf文件
                loadBoxGltf();
                loadTruckGltf();
            });

        // loadGltf();
        // loadGltf1();
    }


    //添加模型描边效果控制器
    function initModelOutline(){
        composer = new THREE.EffectComposer(renderer);
        var renderPass = new THREE.RenderPass(scene, camera);//原始场景渲染结果

        composer.addPass(renderPass);
        outlinePass = new THREE.OutlinePass(new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 ), scene, camera );//轮廓通道

        composer.addPass(outlinePass);
    }


    //加载弹箱gltf模型方法
    function loadBoxGltf(){
        var loder=new THREE.GLTFLoader();
        loder.load("assets/objs/transport/dx.gltf",function (obj) {
            //获取模型，并添加到场景
            var modelScene=obj.scene;
            modelScene.scale.set(0.1, 0.1, 0.1);
            modelScene.traverse(function(child){
                //调整模型显示环境配合内容，模型更接近原样
                if (child.isMesh) {
                    child.material.envMap = envMap;//设置环境颜色
                    child.material.emissive =  child.material.color;//设置材质发射的颜色，默认为黑色
                    child.material.emissiveMap = child.material.map;//设置材质发射环境的颜色，默认为黑色
                }
            });
            scene.add(modelScene);
        }, onProgress, onError);
    }

    //加载弹箱gltf模型方法
    function loadTruckGltf(){
        var loder=new THREE.GLTFLoader();
        loder.load("assets/objs/transport/truck.gltf",function (obj) {
            //获取模型，并添加到场景
            var modelScene=obj.scene;
            modelScene.scale.set(0.01, 0.01, 0.01);
            modelScene.rotateY(Math.PI/2);//Y旋转
            modelScene.translateX(9);
            modelScene.translateY(-13.6);
            modelScene.translateZ(-20);
            modelScene.traverse(function(child){
                //调整模型显示环境配合内容，模型更接近原样
                if (child.isMesh) {
                    child.material.envMap = envMap;//设置环境颜色
                    child.material.emissive =  child.material.color;//设置材质发射的颜色，默认为黑色
                    child.material.emissiveMap = child.material.map;//设置材质发射环境的颜色，默认为黑色
                }
            });
            scene.add(modelScene);
        }, onProgress, onError);
    }

    //添加光
    var ambientLight,pointLight;
    function initLight() {
        ambientLight = new THREE.AmbientLight("#ffffff");
        scene.add(ambientLight);

        pointLight = new THREE.PointLight("#ffffff");
        pointLight.position.set(100, 100, 100);
        scene.add(pointLight);

        var pointLight1 = new THREE.PointLight("#ffffff");
        pointLight1.position.set(-100, 100, -100);
        scene.add(pointLight1);
    }

    function init() {
        // scene
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        var models = document.getElementById('model');
        initDraw();
        models.appendChild(renderer.domElement);

        initAxes();
        loadHdrAndModel();

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.getElementById("model").addEventListener('dblclick', mouseDblclick, false);
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('click', onMouseClick, false );
    }

    function initDraw(){
        initLight();
        initCamera();
        initRenderer();
        initControls();
        initModelOutline();
    }

    function mouseDblclick(){
        initDraw();
    }

    function animate() {
        composer.render();
        //render();
        requestAnimationFrame(animate);

    }

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseClick(event) {
        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
        mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(mouse, camera);

        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects(scene.children,true);

        selectedObjects = [];
        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        selectedObjects.push(intersects[0].object);//添加被拾取物体
        // for ( var i = 0; i < intersects.length; i++ ) {
        //     // intersects[i].object.material.color.set(0xff0000);
        //     selectedObjects.push(intersects[i].object);//添加被拾取物体
        // }
        outlinePass.selectedObjects = selectedObjects;//被拾取物体显示轮廓效果
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

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
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