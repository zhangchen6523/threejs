<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>threejs</title>
    <meta charset="utf-8">
</head>
<body>
<div id="model" style="height:100vh;width: 100vm;"></div>
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
    var camera, scene, renderer, controls,group;

    init();
    animate();

    //创建辅助坐标，调整模型位置打开
    function initAxes() {
        var axes = new THREE.AxisHelper(10000);
        scene.add(axes);
    }

    //创建摄像机
    function initCamera() {
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 10000);
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 200;
        camera.lookAt(scene.position);
    }

    //创建渲染器
    function initRenderer() {
        renderer.setClearAlpha(0.2);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;//切换rgb模式输出，模型变亮

        renderer.render(scene, camera);
    }

    //创建控制器
    function initControls() {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;// 设置平面自动旋转
    }

    //添加光
    var ambientLight;
    function initLight() {
        ambientLight = new THREE.AmbientLight("#ffffff",1);
        scene.add(ambientLight);
    }

    function init() {
        // scene
        scene = new THREE.Scene();
        var bgTexture = new THREE.TextureLoader().load("assets/objs/earth/starback.jpg");
        scene.background = bgTexture;
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        var models = document.getElementById('model');
        initLight();
        initCamera();
        initRenderer();
        initControls();

        initAxes();
        initObject();
        models.appendChild(renderer.domElement);

        document.getElementById("model").addEventListener('dblclick', mouseDblclick, false);
        window.addEventListener('resize', onWindowResize, false);
    }


    // 获取position
    function getPosition(lng, lat, alt) {
        var phi = (90-lat)*(Math.PI/180),
            theta = (lng+180)*(Math.PI/180),
            radius = alt+200,
            x = -(radius * Math.sin(phi) * Math.cos(theta)),
            z = (radius * Math.sin(phi) * Math.sin(theta)),
            y = (radius * Math.cos(phi));
        return {x: x, y: y, z: z};
    }

    function mouseDblclick(){
        controls.reset();//回归相机初始视角，将模型归位
    }

    function animate() {
        render();
        requestAnimationFrame(animate);

    }

    //没有描边的处理方法
    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    function initObject(){
        var loader =  new THREE.TextureLoader();
        // 创建球体
        let geometry = new THREE.SphereGeometry(80, 40,40 );
        // 添加贴图
        let texture = loader.load('assets/objs/earth/world.jpg');
        let material = new THREE.MeshPhongMaterial();
        material.map = texture;

        // 添加浮雕凹凸贴图
        let bump = loader.load('assets/objs/earth/earth_bump.jpg');
        material.bumpMap = bump;
        material.bumpScale = 1;
        // 添加高光贴图
        let spec = loader.load('assets/objs/earth/earth_spec.jpg');
        material.specularMap = spec;
        material.specular = new THREE.Color('#1a2948');
        material.shininess = 2;

        let mesh = new THREE.Mesh(geometry, material);
        mesh.rotateY(Math.PI);
        mesh.rotateY(-Math.PI/10);
        mesh.rotateX(-Math.PI/6);
        mesh.rotateZ(Math.PI/12);

        group = new THREE.Group();
        group.name = 'earth';
        group.add( mesh);
        // 添加地球到场景
        scene.add(group);

        // 创建云层
        var earthCloudsMat = new THREE.MeshLambertMaterial( {
            color: 0xffffff,
            blending: THREE.NormalBlending,
            transparent: true,
            depthTest: false,
        } );
        let cloud = new THREE.SphereGeometry(83, 40,40 );
        let cloudTexture = loader.load('assets/objs/earth/earth_cloud.png');
        earthCloudsMat.map = cloudTexture;
        earthCloudsMat.needsUpdate = true;
        var sphereCloudsMesh = new THREE.Mesh( cloud, earthCloudsMat );
        sphereCloudsMesh.name = 'cloud';
        //添加云层到场景
        scene.add(sphereCloudsMesh);
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