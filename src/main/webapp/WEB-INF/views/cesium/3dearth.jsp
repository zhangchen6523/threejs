<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>3D Earth</title>
    <script src="libs/cesium/Cesium.js"></script>
    <link rel="stylesheet" href="libs/cesium/Widgets/widgets.css">
</head>
<body>
    <div id="container" style="width: 100%;height: 100%;"></div>
    <script>
        var viewer = new Cesium.Viewer('container',{
            baseLayerPicker:false,
            homeButton:false,
            vrButton:false

        });
    </script>
</body>
</html>