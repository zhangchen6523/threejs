<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
        html, body {
            margin: 0;
            height: 100%;
        }

        canvas {
            display: block;
        }

    </style>
</head>
<body onload="draw();">

</body>

<script src="libs/threejs/three.js"></script>
<script src="libs/threejs/loaders/OBJLoader.js"></script>
<script src="libs/threejs/loaders/MTLLoader.js"></script>
<script src="libs/threejs/loaders/GLTFLoader.js"></script>
<script src="libs/threejs/loaders/RGBELoader.js"></script>
<script src="libs/threejs/controls/OrbitControls.js"></script>
<script src="libs/threejs/libs/stats.min.js"></script>
<script src="libs/threejs/libs/dat.gui.min.js"></script>
<script>
    var renderer;
    function initRender() {
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        //告诉渲染器需要阴影效果
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
        renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild(renderer.domElement);
    }

    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 40, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }

    //初始化dat.GUI简化试验流程
    var gui;
    function initGui() {
        //声明一个保存需求修改的相关数据的对象
        gui = {
            ambientLight:"#111111", //环境光源
            pointLight:"#ffffff", //点光源
            lightY: 30, //灯光y轴的位置
            cubeX: 5, //立方体的x轴位置
            cubeY: 5, //立方体的x轴位置
            cubeZ: -5 //立方体的z轴的位置
        };
        var datGui = new dat.GUI();
        //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
        datGui.addColor(gui,"ambientLight").onChange(function (e) {
            ambientLight.color = new THREE.Color(e);
        });
        datGui.addColor(gui,"pointLight").onChange(function (e) {
            pointLight.color = new THREE.Color(e);
        });
        datGui.add(gui, "lightY", 0, 100);
        datGui.add(gui, "cubeX", -30, 30);
        datGui.add(gui, "cubeY", -30, 30);
        datGui.add(gui, "cubeZ", -30, 30);
    }

    var ambientLight,pointLight;
    function initLight() {
        ambientLight = new THREE.AmbientLight("#111111");
        scene.add(ambientLight);

        pointLight = new THREE.PointLight("#ffffff");
        pointLight.position.set(15, 30, 10);

        //告诉平行光需要开启阴影投射
        pointLight.castShadow = true;

        scene.add(pointLight);
    }

    var cube;
    function initModel() {

        //辅助工具
        var helper = new THREE.AxisHelper(10);
        scene.add(helper);

        // 创建一个立方体
        //    v6----- v5
        //   /|      /|
        //  v1------v0|
        //  | |     | |
        //  | |v7---|-|v4
        //  |/      |/
        //  v2------v3

        //立方体
        var cubeGeometry = new THREE.CubeGeometry(10,10,10);

        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff});

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = 5;
        cube.position.y = 5;
        cube.position.z = -5;

        //告诉立方体需要投射阴影
        cube.castShadow = true;

        scene.add(cube);

    }

    function initPlat(){
        //底部平面
        var planeGeometry = new THREE.PlaneGeometry(100, 100);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});

        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -0;

        //告诉底部平面需要接收阴影
        plane.receiveShadow = true;

        scene.add(plane);
    }

    //初始化性能插件
    var stats;
    function initStats() {
        stats = new Stats();
        document.body.appendChild(stats.dom);
    }

    //用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
    var controls;
    function initControls() {

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        controls.enableZoom = true;
        //是否自动旋转
        controls.autoRotate = false;
        //设置相机距离原点的最远距离
        controls.minDistance = 50;
        //设置相机距离原点的最远距离
        controls.maxDistance = 200;
        //是否开启右键拖拽
        controls.enablePan = true;
    }

    function render() {
        renderer.render(scene, camera);
    }

    //窗口变动触发的函数
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        render();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {
        //更新控制器
        render();
        //更新性能插件
        stats.update();

        //更新相关位置
        // pointLight.position.y = gui.lightY;
        // cube.position.x = gui.cubeX;
        // cube.position.y = gui.cubeY;
        // cube.position.z = gui.cubeZ;

        controls.update();

        requestAnimationFrame(animate);
    }

    function draw() {
        initGui();
        initRender();
        initScene();
        initCamera();
        initLight();
        initModel();
        initPlat();
        initControls();
        initStats();

        loadGltf();

        animate();
        window.onresize = onWindowResize;
    }


    function loadGltf(){
        var loder=new THREE.GLTFLoader();
        loder.load("assets/objs/transport/001.gltf",function (obj) {
            //获取模型，并添加到场景
            var modelScene=obj.scene;
            modelScene.scale.set(0.01, 0.01, 0.01);
            modelScene.rotateY(Math.PI);
            // modelScene.traverse(function(child){
            //     if (child.isMesh) {
            //         child.material.envMap = envMap;
            //     }
            // });
            scene.add(modelScene);

            scene.add(modelScene);
        });
    }
</script>
</html>