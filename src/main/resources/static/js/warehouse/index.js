(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (factory());
}(this, (function () { 'use strict';

    window.onload = function() {
        // console.log(123);
        init();
    };
    // scenes/妊公育种.json
    // incubator 保育 delivery 产房 breeding peizhong
    const g3d = window.g3d = new ht.graph3d.Graph3dView(),
        g2d = window.g2d = new ht.graph.GraphView(),
        dm3 = g3d.dm(), dm2 = g2d.dm();
    let oldScene = null;

    const map = window.map = {
        ui: {
            url: 'displays/warehouse/仓库可视化监管系统.json',
            mi: function(e) {

            }
        },
        root: {
            url: 'js/warehouse/scenes/仓库可视化系统.json',
            mi: function(e) {
                // console.log(e.kind);
                if(e.kind === 'clickData') {
                    // console.log(e.data.a('type'));
                    let type = e.data.a('type');
                    if(type) {
                        // console.log(type);
                        sceneIn(type);
                    }
                }
            }
        },
        incubator: {
            url: 'js/warehouse/scenes/保育舍.json',
            mi: function(e) {
                switch (e.kind) {
                    case 'clickData':
                        let tag = e.data.getTag();
                        // console.log(tag);
                        if(tag === 'pig') {
                            let pig = g3d.dm().getDataByTag('billboard1'), p = e.data.p3();
                            pig.s('3d.visible', true);

                            pig.p3([p[0] - 100, p[1] + 150, p[2] ] );
                        }
                        if(tag === 'zj') {
                            let zj = g3d.dm().getDataByTag('billboard2'), p = e.data.p3();
                            zj.s('3d.visible', true);

                            zj.p3([p[0] + 100, p[1] + 250, p[2] ] );
                        }
                        if(tag === 'billboard1') {
                            dm2.getDataByTag('video').s('2d.visible', true);
                        }
                        break;
                    case 'doubleClickBackground':
                        sceneIn('root');
                        dm2.getDataByTag('video').s('2d.visible', false);
                        break;
                    // default:

                }
            }
        },
        delivery: {
            url: 'js/warehouse/scenes/产房.json',
            mi: function(e) {
                switch (e.kind) {
                    case 'clickData':
                        let tag = e.data.getTag();
                        // console.log(tag);
                        if(tag === 'pig') {
                            let pig = g3d.dm().getDataByTag('billboard1'), p = e.data.p3();
                            pig.s('3d.visible', true);

                            pig.p3([p[0] - 100, p[1] + 150, p[2] ] );
                        }
                        if(tag === 'zj') {
                            let zj = g3d.dm().getDataByTag('billboard2'), p = e.data.p3();
                            zj.s('3d.visible', true);

                            zj.p3([p[0] + 100, p[1] + 250, p[2] ] );
                        }
                        if(tag === 'billboard1') {
                            dm2.getDataByTag('video').s('2d.visible', true);
                        }
                        break;
                    case 'doubleClickBackground':
                        sceneIn('root');
                        dm2.getDataByTag('video').s('2d.visible', false);
                        break;
                    // default:

                }
            }
        },
        breeding: {
            url: 'js/warehouse/scenes/妊公育种.json',
            mi: function(e) {
                switch (e.kind) {
                    case 'clickData':
                        let tag = e.data.getTag();
                        // console.log(tag);
                        if(tag === 'pig') {
                            let pig = g3d.dm().getDataByTag('billboard1'), p = e.data.p3();
                            pig.s('3d.visible', true);

                            pig.p3([p[0] - 100, p[1] + 150, p[2] ] );
                        }
                        if(tag === 'zj') {
                            let zj = g3d.dm().getDataByTag('billboard2'), p = e.data.p3();
                            zj.s('3d.visible', true);

                            zj.p3([p[0] + 100, p[1] + 250, p[2] ] );
                        }
                        if(tag === 'billboard1') {
                            dm2.getDataByTag('video').s('2d.visible', true);
                        }
                        break;
                    case 'doubleClickBackground':
                        sceneIn('root');
                        dm2.getDataByTag('video').s('2d.visible', false);
                        break;
                    // default:

                }
            }
        }
    };

    g3d.addToDOM();
    // this.defaultMapInteractor =  new ht.graph3d.MapInteractor(g3d);
    // this.defaultMapInteractor.maxPhi = Math.PI;
    g3d.setInteractors([new ht.graph3d.MapInteractor(g3d)]);

    let g2dView = g2d.getView();
    g2dView.style.left = '0';
    g2dView.style.right = '0';
    g2dView.style.top = '0';
    g2dView.style.bottom = '0';
    // 选中边框为0
    g2d.getSelectWidth = function () { return 0; };
    // 禁止鼠标缩放
    g2d.handleScroll = function () { };
    // 禁止 touch 下双指缩放
    g2d.handlePinch = function () { };
    // 禁止平移
    g2d.setPannable(false);
    // 禁止框选
    g2d.setRectSelectable(false);
    // 隐藏滚动条
    g2d.setScrollBarVisible(false);
    // 禁止图元移动
    g2d.setMovableFunc(function () { return false; });

    // g3d.getView().appendChild(g2dView);
    g2d.addToDOM(g3d.getView() );
    g2d.mi(e => {
        if(e.kind === 'clickData') {
        if(e.data.getTag() === 'exit') {
            sceneIn('root');
            dm2.getDataByTag('video').s('2d.visible', false);
        }
    }
});


    function init() {
        // console.log(4321);
        // let url = map.root.url;
        load2D('ui', map, json => {
            g2d.deserialize(json);
    });

        load3D('root', map, json => {
            sceneIn('root');
    });
        load3D('incubator', map);
        load3D('delivery', map);
        load3D('breeding', map);

    }

    function load3D(key, map, callback, scope) {
        ht.Default.xhrLoad(map[key].url, text => {
            // console.log(json);
            const json = ht.Default.parse(text);
        // const dm = new ht.DataModel();
        map[key].json = json;
        // console.log(json);
        callback && callback.call(scope, json);
    });

    }
    function load2D(key, map, callback, scope) {
        ht.Default.xhrLoad(map[key].url, text => {
            // console.log(json);
            const json = ht.Default.parse(text);
        // const dm = new ht.DataModel();
        map[key].json = json;
        // console.log(json);
        callback && callback.call(scope, json);
    });

    }

    function sceneIn(sin) {
        // console.log(sin);
        if(oldScene) {
            sceneOut(oldScene);
        }

        const info = map[sin];
        // console.log(info);

        var scene = info.json.scene;

        g3d.setFar(scene.far);
        g3d.setNear(scene.near);

        g3d.setEye(scene.eye);
        g3d.setCenter(scene.center);
        // g3d.flyTo();

        g3d.deserialize(info.json);
        oldScene = sin;
        g3d.mi(info.mi, g3d);
    }

    function sceneOut(oldscene) {
        g3d.dm().clear();
        g3d.umi(map[oldscene].mi, g3d);
    }

})));
