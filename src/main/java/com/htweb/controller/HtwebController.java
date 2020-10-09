package com.htweb.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class HtwebController {
    @RequestMapping(value = "/gis")
    public String index() {
        return "/gis/gis";
    }

    @RequestMapping(value = "/build")
    public String build() {
        return "/build/build";
    }

    @RequestMapping(value = "/gas")
    public String gasPipeline() {
        return "/gasPipeline/gas";
    }

    @RequestMapping(value = "/gas3d")
    public String gas3d() {
        return "/gasPipeline/gas3d";
    }

    @RequestMapping(value = "/i19")
    public String i19() {
        return "/submarine/i19";
    }

    @RequestMapping(value = "/u")
    public String u() {
        return "/submarine/u";
    }

    @RequestMapping(value = "/warehouse")
    public String warehouse() {
        return "/warehouse/warehouse";
    }

    @RequestMapping(value = "/shelves")
    public String shelves() {
        return "/shelves/shelves";
    }

    @RequestMapping(value = "/airShip")
    public String airShip() {
        return "/airShip/airShip";
    }

    @RequestMapping(value = "/ballistic")
    public String ballistic() {
        return "/ballistic/ballistic";
    }

    @RequestMapping(value = "/missileCar")
    public String missileCar() {
        return "/missileCar/missileCar";
    }

    @RequestMapping(value = "/transport")
    public String transport() {
        return "/transport/transport";
    }

    @RequestMapping(value = "/threejs")
    public String threejs() {
        return "/threejs/threejs";
    }

    @RequestMapping(value = "/earth")
    public String earth() {
        return "/threejs/earth";
    }

    @RequestMapping(value = "/truck")
    public String truck() {
        return "/threejs/truck";
    }

    @RequestMapping(value = "/map")
    public String map() {
        return "/baidumap/map";
    }

    @RequestMapping(value = "/area")
    public String area() {
        return "/baidumap/area";
    }

    @RequestMapping(value = "/tdearth")
    public String tdearth() {
        return "/cesium/3dearth";
    }

    @RequestMapping(value = "/lotbox")
    public String lotBox() {
        return "/threejs/lotbox";
    }

}
