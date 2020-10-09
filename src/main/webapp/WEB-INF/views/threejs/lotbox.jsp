<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>threejs</title>
    <meta charset="utf-8">
</head>
<body>
<div id="model" style="margin: 0px 0px 0px 25%;"></div>
<div style="margin: 0px 0px 0px 32%;">
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
<script src="libs/threejs/postprocessing/ShaderPass.js"></script>
<script src="libs/threejs/postprocessing/RenderPass.js"></script>
<script src="libs/threejs/shader/CopyShader.js"></script>

<script>
    var camera, scene, renderer, envMap, controls;

    init();
    animate();

    //没有描边的处理方法
    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    //创建辅助坐标，调整模型位置打开
    function initAxes() {
        var axes = new THREE.AxisHelper(1000);
        scene.add(axes);
    }

    //创建摄像机
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
        camera.position.x = 150;
        camera.position.y = 100;
        camera.position.z = -150;
        camera.lookAt(scene.position);
    }

    //创建渲染器
    function initRenderer() {
        // renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));//添加背景颜色
        renderer.setClearAlpha(0.2);
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);
        // renderer.toneMappingExposure = 1.1;//曝光度
        renderer.outputEncoding = THREE.sRGBEncoding;//切换rgb模式输出，模型变亮

        renderer.render(scene, camera);
    }

    //创建控制器
    function initControls() {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;// 设置平面自动旋转
    }

    //添加hdr环境光文件和模型
    function loadHdrAndModel() {
        var pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        //加载hdr文件
        new THREE.RGBELoader()
            .setDataType(THREE.UnsignedByteType)
            .setPath('assets/objs/transport/tex/')
            .load('Sky.hdr', function (texture) {
                envMap = pmremGenerator.fromEquirectangular(texture).texture;
                //scene.background = envMap;
                scene.environment = envMap;
                texture.dispose();
                pmremGenerator.dispose();
                loadBoxGltf();
            });
    }

    //加载弹箱gltf模型方法
    function loadBoxGltf(){
        var loder=new THREE.GLTFLoader();
        var group = new THREE.Group();
        var col=10;
        var layer=10;
        var row=10;
        loder.load("assets/objs/transport/dxx.gltf",function (obj) {
            //获取模型，并添加到场景
            var modelScene = obj.scene;
            modelScene.scale.set(0.3, 0.3, 0.3);
            modelScene.name = "box";
            modelScene.traverse(function(child){
                //调整模型显示环境配合内容，模型更接近原样
                if (child.isMesh) {
                    child.material.envMap = envMap;//设置环境颜色
                    child.material.emissive =  child.material.color;//设置材质发射的颜色，默认为黑色
                    child.material.emissiveMap = child.material.map;//设置材质发射环境的颜色，默认为黑色
                }
            });

            var box = new THREE.Box3();
            box.expandByObject(modelScene);
            // 平面阵列
            for (var c = 0; c < col; c++) {
                for (var l = 0; l < layer; l++) {
                    for (var r = 0; r < row; r++) {
                        //网格模型对象
                        var cloneModel = modelScene.clone();
                        //立方体间距15（阵列距离）
                        cloneModel.position.set(r * box.max.x * 2.17, l * box.max.z * 2.17, c * box.max.y * 2.17);
                        group.add(cloneModel);
                    }
                }
            }

            var boxCenter = new THREE.Box3();
            boxCenter.expandByObject(group);

            var length = boxCenter.max.x - boxCenter.min.x;
            var width = boxCenter.max.z - boxCenter.min.z;
            var height = boxCenter.max.y - boxCenter.min.y;

            var cx = boxCenter.min.x + length / 2;
            var cy = boxCenter.min.y + height / 2;
            var cz = boxCenter.min.z + width / 2;

            group.position.set(-cx,-cy,-cz);
            scene.add(group);

            // console.log(length+";"+width+";"+height);

        }, onProgress, onError);

        var ratio = 1/Math.max(col,layer,row);
        group.scale.set(ratio, ratio, ratio);

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

    function init() {
        // scene
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        var models = document.getElementById('model');
        initLight();
        initCamera();
        initRenderer();
        initControls();
        models.appendChild(renderer.domElement);

        initAxes();
        loadHdrAndModel();

        // document.getElementById("model").addEventListener('dblclick', mouseDblclick, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    function mouseDblclick(){
        controls.reset();//回归相机初始视角，将模型归位
    }

    function animate() {
        render();
        requestAnimationFrame(animate);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth/2 , window.innerHeight/2);
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