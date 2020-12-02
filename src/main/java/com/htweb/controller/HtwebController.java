package com.htweb.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class HtwebController {

    @RequestMapping(value = "/i19")
    public String i19() {
        return "/submarine/i19";
    }

    @RequestMapping(value = "/u")
    public String u() {
        return "/submarine/u";
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

    @RequestMapping(value = "/lotbox")
    public String lotBox() {
        return "/threejs/lotbox";
    }

}
