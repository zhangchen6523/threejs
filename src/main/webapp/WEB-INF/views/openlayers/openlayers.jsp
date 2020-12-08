<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta charset="utf-8">
    <link rel="stylesheet"
          href="libs/map/openlayers/ol.css"
          type="text/css">
    <style>
        .map {
            height: 800px;
            width: 100%;
        }
    </style>
    <script src="libs/map/openlayers/ol.js"></script>
    <title>OpenLayers example</title>
</head>
<body>
<h2>OpenLayers example</h2>
<div id="map" class="map" style="background-color:#133F58"></div>
<script type="text/javascript">

    var source = new ol.source.XYZ();
    source.setUrl("libs/map/openlayers/tiles/{z}/{y}/{x}.png");

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: source
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([108.95000, 34.26667]),
            zoom: 1
        })
    });
</script>
</body>
</html>