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
    var composer,outlinePass;
    var selectedObjects;
    //https://threejs.org/editor/直接使用

    init();
    animate();

    //没有描边的处理方法
    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    //添加模型描边效果控制器
    function initModelOutline(){
        composer = new THREE.EffectComposer(renderer);
        var renderPass = new THREE.RenderPass(scene, camera);//原始场景渲染结果

        composer.addPass(renderPass);
        outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera );//轮廓通道

        composer.addPass(outlinePass);
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

    //加载弹箱gltf模型方法
    function loadTruckGltf(){
        var loder=new THREE.GLTFLoader();
        loder.load("assets/objs/transport/scene.gltf",function (obj) {
            //获取模型，并添加到场景
            var modelScene=obj.scene;
            modelScene.scale.set(0.1, 0.1, 0.1);
            modelScene.name = "truck";
            scene.add(modelScene);
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
        initModelOutline();
        models.appendChild(renderer.domElement);

        initAxes();
        loadTruckGltf();

        document.getElementById("model").addEventListener('mousemove', onMouseClick, false);
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
        composer.render();
        // render();
        requestAnimationFrame(animate);

    }

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseClick(event) {
        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight)  * 2 + 1;

        //alert("mouse.x:"+mouse.x+";mouse.y:"+mouse.y+";window.innerWidth:"+window.innerWidth+";window.innerHeight:"+window.innerHeight);

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(mouse, camera);

        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects(scene.children,true);

        selectedObjects = [];
        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        if (intersects != null && intersects[0] != null && intersects[0].object != undefined) {
            var selectobj = intersects[0].object.parent;
            if (selectobj.type == 'Group' && selectobj.name != '' ){
                selectedObjects.push(selectobj);//添加被拾取物体
            }
        }
        outlinePass.selectedObjects = selectedObjects;//被拾取物体显示轮廓效果
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