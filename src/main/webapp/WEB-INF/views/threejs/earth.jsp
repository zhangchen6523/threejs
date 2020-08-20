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
    var camera, scene, renderer, envMap, controls;
    var composer, outlinePass;
    var selectedObjects;

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

    //添加hdr环境光文件和模型
    function loadHdrAndModel() {
        var pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        //加载hdr文件
        new THREE.RGBELoader()
            .setDataType(THREE.UnsignedByteType)
            .setPath('assets/objs/transport/tex/')
            .load('Sky1.hdr', function (texture) {
                envMap = pmremGenerator.fromEquirectangular(texture).texture;
                //scene.background = envMap;
                scene.environment = envMap;
                texture.dispose();
                pmremGenerator.dispose();

            });

    }

    //添加模型描边效果控制器
    function initModelOutline(){
        composer = new THREE.EffectComposer(renderer);
        var renderPass = new THREE.RenderPass(scene, camera);//原始场景渲染结果

        composer.addPass(renderPass);
        outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera );//轮廓通道

        composer.addPass(outlinePass);
    }


    //添加光
    var ambientLight,pointLight;
    function initLight() {
        ambientLight = new THREE.AmbientLight("#ffffff",1);
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

        initObject();
        initModelOutline();
        models.appendChild(renderer.domElement);

        initAxes();
        loadHdrAndModel();

        document.getElementById("model").addEventListener('mousemove', onMouseClick, false);
        //document.getElementById("model").addEventListener('click', onMouseClick, false );
        document.getElementById("model").addEventListener('dblclick', mouseDblclick, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    function mouseDblclick(){
        controls.reset();//回归相机初始视角，将模型归位
    }

    function animate() {
        composer.render();
        //render();
        requestAnimationFrame(animate);

    }

    function initObject(){
        var loader =  new THREE.TextureLoader();
        // 创建球体
        let geometry = new THREE.SphereGeometry(80, 40,40 );
        // 添加贴图
        let texture = loader.load('assets/objs/earth/earth.jpg');
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

        var group = new THREE.Group();
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


    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseClick(event) {
        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
        mouse.x = (event.clientX / (window.innerWidth/2)) * 2 - 1;
        mouse.y = -(event.clientY / (window.innerHeight/2))  * 2 + 1;

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