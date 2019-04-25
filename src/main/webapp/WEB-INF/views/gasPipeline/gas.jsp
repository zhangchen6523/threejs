<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>Gas Pipeline</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <style>
        html, body {
            padding: 0px;
            margin: 0px;
        }
    </style>
    <script src='guide/lib/core/ht.js'></script>
    <script src='libs/ht-edgetype.js'></script>
    <script src='libs/ht-vector.js'></script>
    <script>
        function init() {
            dataModel = new ht.DataModel();
            graphView = new ht.graph.GraphView(dataModel);
            graphView.addToDOM();

            ht.Default.xhrLoad('js/gasPipeline/display/HT-Project/gasPipeline.json', function(text) {
                var json = ht.Default.parse(text);
                if(json.title) document.title = json.title;
                graphView.deserialize(json);
                graphView.fitContent(true);
            });
        }
    </script>
</head>
<body onload='setTimeout(init, 300)'>
</body>
</html>
