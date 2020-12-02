var BMapLib = window.BMapLib = BMapLib || {};

(function() {
    var CurveLine =
        BMapLib.CurveLine = function(points, opts){
        var curvePoints = getCurvePoints(points);
        var polyline = new BMap.Polyline(curvePoints, opts);
        polyline.addEventListener('lineupdate', function(){
            if (this.isEditing) {
                this.enableEditing();
            }
        });
        polyline.editMarkers = [];
        polyline.points = points;
        polyline.enableEditing = enableEditing;
        polyline.disableEditing = disableEditing;
        polyline.getPath = getPath;
        return polyline;
    }
    getCurvePoints = function(points) {
        var curvePoints = [];
        for (var i = 0; i < points.length - 1; i++) {
            var p = getCurveByTwoPoints(points[i], points[i + 1]);
            if (p && p.length > 0) {
                curvePoints = curvePoints.concat(p);
            }
        }
        return curvePoints;
    }
    getCurveByTwoPoints = function(obj1, obj2) {
        if (!obj1 || !obj2 || !(obj1 instanceof BMap.Point) || !(obj2 instanceof BMap.Point)) {
            return null;
        }
        var B1 = function(x) {
            return 1 - 2 * x + x * x;
        };
        var B2 = function(x) {
            return 2 * x - 2 * x * x;
        };
        var B3 = function(x) {
            return x * x;
        };
        curveCoordinates = [];
        var count=30; // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
        var isFuture=false;
        var t, h, h2, lat3, lng3, j, t2;
        var LnArray = [];
        var i = 0;
        var inc = 0;
        if (typeof(obj2) == "undefined") {
                if (typeof(curveCoordinates) != "undefined") {
                    curveCoordinates = [];
                }
                return;
            }

            var lat1 = parseFloat(obj1.lat);
            var lat2 = parseFloat(obj2.lat);
            var lng1 = parseFloat(obj1.lng);
            var lng2 = parseFloat(obj2.lng);

            // 计算曲线角度的方法
            if (lng2 > lng1) {
                if (parseFloat(lng2-lng1) > 180) {
                    if (lng1 < 0) {
                        lng1 = parseFloat(180 + 180 + lng1);
                    }
                }
            }

            if (lng1 > lng2) {
                if (parseFloat(lng1-lng2) > 180) {
                    if (lng2 < 0) {
                        lng2 = parseFloat(180 + 180 + lng2);
                    }
                }
            }
            j = 0;
            t2 = 0;
            if (lat2 == lat1) {
                t = 0;
                h = lng1 - lng2;
            } else if (lng2 == lng1) {
                t = Math.PI / 2;
                h = lat1 - lat2;
            } else {
                t = Math.atan((lat2 - lat1) / (lng2 - lng1));
                h = (lat2 - lat1) / Math.sin(t);
            }
            if (t2 == 0) {
                t2 = (t + (Math.PI / 5));
            }
            h2 = h / 2;
            lng3 = h2 * Math.cos(t2) + lng1;
            lat3 = h2 * Math.sin(t2) + lat1;

            for (i = 0; i < count + 1; i++) {
                curveCoordinates.push(new BMap.Point(
                    (lng1 * B1(inc) + lng3 * B2(inc)) + lng2 * B3(inc),
                    (lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc))
                ));
                inc = inc + (1 / count);
            }
            return curveCoordinates;
        }

        /**
         * 重写弧线的编辑功能
         */
        function enableEditing() {
            if (this.map) {
                this.disableEditing();
                for (var i = 0; i < this.points.length; i++) {
                    var marker = new BMap.Marker(this.points[i], {
                        icon: new BMap.Icon('../src/circle.png', new BMap.Size(16,16)),
                        enableDragging: true,
                        raiseOnDrag: true
                    });
                    var self = this;
                    marker.addEventListener('dragend', function(){
                        self.points.length = 0;
                        for (var i = 0; i < self.editMarkers.length; i++) {
                            self.points.push(self.editMarkers[i].getPosition());
                        }
                        var curvePoints = getCurvePoints(self.points)
                        self.setPath(curvePoints);
                    });
                    marker.index = i;
                    this.editMarkers.push(marker);
                    this.map.addOverlay(marker);
                }
            }
            this.isEditing = true;
        }
        function disableEditing() {
            this.isEditing = false;
            //清空之前的编辑点
            for (var i = 0; i < this.editMarkers.length; i++) {
                this.map.removeOverlay(this.editMarkers[i]);
                this.editMarkers[i] = null;
            }
            this.editMarkers.length = 0;
        }
        function getPath() {
            return this.points;
        }

})();
