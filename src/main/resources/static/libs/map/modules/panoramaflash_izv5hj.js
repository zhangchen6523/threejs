/**/_jsload2&&_jsload2('panoramaflash', 'z.extend(Qa.prototype,{Gi:function(){for(var a=0;a<D.Lq.length;a++)D.Lq[a](this);this.Kf!=q&&this.dispatchEvent(new Q("onvisible_poi_type_changed"),{visiblePOIType:this.Kf});this.Xk=this.ah();this.Zq=this.fd=t;this.Yp={};this.ed=new pk(this);this.MR();this.AP();this.CP();if(this.bb||this.Kb)this.bb?this.Ac(this.bb,this.Ie):this.ua(this.Kb)},CP:function(){var a=this;setInterval(function(){if(a.Xb()){var b=a.ah();b.Wb(a.Xk)||(a.ed.set("size",{width:b.width,height:b.height}),a.Xk=b,a.dispatchEvent(new Q("size_changed")))}}, 80)},MR:function(){var a=this.ed,b=this;a.addEventListener("clicked_position",function(a){b.dispatchEvent(new Q("onclicked_position"),a)});a.addEventListener("thumbnail_complete",function(){b.dispatchEvent(new Q("onthumbnail_complete"))});a.addEventListener("indoor_enter",function(a){a.data.C4===q?b.pj({haveBreakId:t}):b.pj({haveBreakId:p});b.dispatchEvent(new Q("onhaveBreakId_changed"))});a.addEventListener("first_thumb_complete",function(){var a,e;if(b.fd!==p){b.fd=p;a=this;b.bb=a.get("id");"street"!= b.Ie&&(b.Ie="street",b.Ux("inter"));b.An=a.get("links");e=a.get("position");b.Kb=e;e=a.get("pov");!b.Ia.heading&&!b.Ia.pitch?b.Ia=e:(e.heading!=b.Ia.heading||e.pitch!=b.Ia.pitch)&&a.set("pov",b.Ia);e=a.get("zoom");1==!b.Kc&&1!=e?b.Kc==e:b.Kc!=e&&a.set("zoom",b.Kc);e=q;for(var f in b.He)e=b.He[f],delete b.He[f],b.Oa(e);b.m.navigationControl===t&&a.set("navigationControlVisible",t);var g=function(b){a.Qr("toggleUI",{topo:b.linksControl,wellLid:b.clickOnRoad,innerExit:t,innerFloor:b.indoorFloorControl})}; g(b.m);b.addEventListener("clickonroad_changed",function(){g(b.m)});b.addEventListener("links_visible_changed",function(){g(b.m)});b.addEventListener("onindoorfloor_options_changed",function(){g(b.m)});b.addEventListener("navigation_visible_changed",function(){a.set("navigationControlVisible",b.m.navigationControl)});if(0<b.Pg.length){f=0;for(e=b.Pg.length;f<e;f++)b.Pg[f].register(b.P,b,b.ed);var i="",k=[];f=0;for(e=b.Nq.length;f<e;f++)i=b.Nq[f].jM,k=b.Nq[f].iM,b[i].apply(b,k)}b.m.visible?b.show(): b.$()}});a.addEventListener("pano_error",function(){b.dispatchEvent(new Q("error"))});a.addEventListener("id_changed",function(a){if(b.fd||b.bb==q||"inter"==b.Ie)b.bb=a.data;b.dispatchEvent(new Q("onid_changed"))});a.addEventListener("position_changed",function(a){b.fd?b.Kb=b.ed.get("position"):b.Kb==q&&(b.Kb=a.data);b.dispatchEvent(new Q("onposition_changed"))});a.addEventListener("pov_changed",function(a){if(b.fd||b.Ia.heading==q)b.Ia=a.data;b.dispatchEvent(new Q("onpov_changed"))});a.addEventListener("links_changed", function(a){if(b.fd||0==b.An.length)b.An=a.data;b.dispatchEvent(new Q("onlinks_changed"))});a.addEventListener("zoom_changed",function(a){if(b.fd||b.Kc==q)b.Kc=a.data;b.dispatchEvent(new Q("onzoom_changed"))});a.addEventListener("sdata_loaded",function(a){b.Ux(a.data.panoType);b.dispatchEvent(new Q("oncopyright_changed"),{copyright:a.data.copyright});if(b.Zq){for(var e in b.Yp)b[e](b.Yp[e]);b.Zq=t;b.Yp={}}});a.addEventListener("overlay_mouseclick",function(a){a=b.He[a.data.markerId];a.dispatchEvent(new Q("onclick"), {type:"click",target:a})});a.addEventListener("overlay_mouseover",function(a){a=b.He[a.data.markerId];a.dispatchEvent(new Q("onmouseover"),{type:"mouseover",target:a})});a.addEventListener("overlay_mouseout",function(a){a=b.He[a.data.markerId];a.dispatchEvent(new Q("onmouseout"),{type:"mouseout",target:a})})},AP:function(){var a=this;z.V(this.P,ja.fa.Qe?"DOMMouseScroll":"onmousewheel",function(b){if(a.m.enableScrollWheelZoom&&a.m.visible){var c=-b.detail/3||b.wheelDelta/120,c=a.ja()+c;a.Pc(c);Db(b)}})}, Ac:function(a,b,c){"object"===typeof b&&(c=b,b=l);if(!this.fd||a&&a!=this.bb)this.fd||(this.bb=a,this.Ie=b||"street",this.Kb=q),this.ed.set("id",{id:a,type:b||"street"}),this.Zq=p,c&&c.pov&&this.od(c.pov)},ua:function(a){if(!this.fd||a&&!this.Kb.Wb(a))this.fd||(this.Kb=a,this.bb=q),this.ed.set("position",a),this.Zq=p},od:function(a){a&&(90<a.pitch&&(a.pitch=90),-90>a.pitch&&(a.pitch=-90),this.fd?this.Zq?this.Yp.setPov=a:this.ed.set("pov",a):this.Ia=a)},Pc:function(a){a!=this.Kc&&(a>ye&&(a=ye),a<ze&& (a=ze),this.fd?this.ed.set("zoom",a):this.Kc=a,this.Yp.setZoom=a)},show:function(){this.m.visible=p;this.yf&&(this.M&&this.M.Qa()===this.P)&&z.U.show(this.yf);this.ed&&this.ed.Kq&&(this.ed.Kq.style.left="0");this.fd&&(this.jl===this.Xb()&&this.ed.set("id",{id:this.jl,type:this.aS||"street"}),this.dispatchEvent(new Q("onvisible_changed")))},$:function(){this.m.visible=t;this.fd&&(this.jl=this.bb,this.aS=this.Ie,this.ed.Qr("closePano"));this.bb=q;this.ed&&this.ed.Kq&&(this.ed.Kq.style.left="-9999px"); this.dispatchEvent(new Q("onvisible_changed"))},lB:function(a){function b(a,b){return function(){a.Nq.push({jM:b,iM:arguments})}}if(this.fd)a.register(this.P,this,this.ed);else for(var c=a.getPanoMethodList(),e="",f=0,g=c.length;f<g;f++)e=c[f],this[e]=b(this,e);this.Pg.push(a)},tE:function(a){this.fd&&a.dispose();for(var b=this.Pg.length;b--;)this.Pg[b]===a&&this.Pg.splice(b,1)},ot:function(a){this.Kf=a||"none";this.dispatchEvent(new Q("onvisible_poi_type_changed"),{visiblePOIType:this.Kf})},Oa:function(a){this.He[a.hd]= a;this.fd&&this.dispatchEvent(new Q("onadd_overlay"),{overlay:a})},Sb:function(a){var b=a.hd;this.fd&&this.dispatchEvent(new Q("onremove_overlay"),{overlay:a});delete this.He[b]},xo:function(){var a=this.ed.get("indoorData");a&&a.pid&&this.Ac(a.pid)},HE:function(a){this.ed.set("interactiveState",a)}});xj=Qa.prototype; V(xj,{setId:xj.Ac,setPosition:xj.ua,setPov:xj.od,setZoom:xj.Pc,show:xj.show,hide:xj.$,addPlugin:xj.lB,removePlugin:xj.tE,addOverlay:xj.Oa,removeOverlay:xj.Sb,setPanoramaPOIType:xj.ot,exitInter:xj.xo,setInteractiveState:xj.HE});function qk(){this.xS=(this.Hz=window.ActiveXObject&&!(window.opera&&!window.opera.nodeType))?\' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"\':\' type="application/x-shockwave-flash"\';this.KH=["id","width","height","align","data"];this.LH="wmode movie flashvars scale quality play loop menu salign bgcolor base allowscriptaccess allownetworking allowfullscreen seamlesstabbing devicefont swliveconnect".split(" ")} z.extend(qk.prototype,{create:function(a,b){var c=this.UQ(a);b&&"string"===typeof b&&(b=document.getElementById(b));b?b.innerHTML=c:document.write(c)},remove:function(a){if((a=this.YK(a))&&this.Hz){a.style.display="none";for(var b in a)"function"===typeof a[b]&&(a[b]=q);window.DO&&setTimeout(window.DO,0)}a.parentNode.removeChild(a)},MW:function(){function a(){var c=function(){var a=navigator;if(a.plugins&&a.mimeTypes.length){if((a=a.plugins["Shockwave Flash"])&&a.description)return a.description.replace(/([a-zA-Z]|\\s)+/, "").replace(/(\\s)+r/,".")+".0"}else if(b.Hz)try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(c)return c.GetVariable("$version").replace(/WIN/g,"").replace(/,/g,".")}catch(g){}}();a=function(){return c};return c}var b=this;return a()},YK:function(a){return document.getElementById(a)},yG:function(a,b){for(var a=a.split("."),b=b.split("."),c=Math.max(a.length,b.length),e=0;e<c;e++){var f=a[e],g=b[e];if(!f||!g)return!f&&!g?0:f?1:-1;f=Number(f);g=Number(g);if(f<g)return-1;if(f>g)return 1}return 0}, UQ:function(a){a=a||{};a.movie=a.url||"";a.altHtml=a.errorMessage||"";if(a.vars){var b=a.vars,c=[],e=q,f=q;for(e in b)f=b[e],c.push(e+"="+encodeURIComponent(f));a.flashvars=c.join("&")}a.minVer=a.ver;b=a.minVer;c=a.maxVer;if(b||c)if(e=this.MW(),!e||b&&0>this.yG(e,b)||c&&0<this.yG(e,c))return a.altHtml||"";e=["<object",this.xS];a.data=a.movie;for(b=0;b<this.KH.length;b++)c=this.KH[b],a.hasOwnProperty(c)&&e.push(" ",c,\'="\',a[c],\'"\');e.push(">");for(b=0;b<this.LH.length;b++)c=this.LH[b],a.hasOwnProperty(c)&& e.push(\'<param name="\',c,\'" value="\',a[c],\'"/>\');e.push("</object>");return e.join("")}});function rk(a,b){this.W=a;this.QQ=b;this.Dh={};this.Ky()}z.extend(rk.prototype,{Ky:function(){var a=this,b=a.W;b.addEventListener("add_overlay",function(b){b=b.overlay;b.xa(a.W,a.QQ);a.Dh[b.hd]=b});b.addEventListener("remove_overlay",function(b){b=b.overlay;b.remove();delete a.Dh[b.hd]})}});z.extend(De.prototype,{xa:function(a,b){this.W=a;this.ka()||this.ua(this.W.ka());this.Ea=b;this.kb()},kb:function(){var a=this.ka(),a=dc.Ud.vg(a),a={markerId:this.hd,catalog:"FD01",name:this.lk(),rank:this.Bo(),x:a.x,y:a.y,color:this.hm(),hoverColor:this.nL,backgroundHoverColor:this.nJ,borderColor:this.borderColor,borderHoverColor:this.rJ,backgroundColor:this.backgroundColor,padding:this.padding,fontSize:this.fontSize,borderWidth:this.borderWidth};if(this.xD||this.getImageData())a.imageUrl=this.xD, a.imageData=this.getImageData(),a.size=this.Cb(),a.image=this.Hw(),a.catalog="FD02",this.Cb()&&(a.width=this.Cb()[0],a.height=this.Cb()[1]);this.Ea.aN(a)},hide:function(){this.Sa=t;this.Ea&&this.Ea.mo(this.hd,"visible",t)},show:function(){this.Sa=p;this.Ea&&this.Ea.mo(this.hd,"visible",p)},isVisible:x("Sa"),Jf:function(a,b){this.Ea&&("position"==a&&(b=dc.Ud.vg(b),b={lng:b.x,lat:b.y}),this.Ea.mo(this.hd,a,b))},remove:function(){this.dispatchEvent(new Q("onremove"),{type:"remove",target:this});this.Ea.TJ([this.hd])}});var sk={none:"",transit:"FE0A",hotel:"FE02",catering:"FE01",movie:"FE06",indoor_scene:"FEFE"},tk={none:["-1",""],transit:["0","m_transit.png"],hotel:["1","m_hotel.png"],catering:["2","m_catering.png"],movie:["3","m_movie.png"],transit:["4","m_transit.png"],indoor_scene:["5","m_indoor_scene.png"]}; z.extend(Ge.prototype,{xa:function(a,b){this.W=a;this.Ea=b;this.kb()},kb:function(){var a=this.ka(),a=dc.Ud.vg(a),b=this.nR(),c=this.hD();this.Ea.aN({markerId:this.hd,catalog:b,name:this.Io(),rank:this.Bo(),x:a.x,y:a.y,heading:c.heading,pitch:c.pitch,pid:c.panoId,panoIId:c.panoIId})},nR:function(){var a=this.Do().match(/.*\\/(.*)/)[1],b;for(b in tk)if(tk[b][1]==a)return sk[b]},hide:function(){this.Sa=t;this.Ea.mo(this.hd,"visible",t)},show:function(){this.Sa=p;this.Ea.mo(this.hd,"visible",p)},isVisible:x("Sa"), Jf:function(a,b){"position"==a&&(b=dc.Ud.vg(b),b={lng:b.x,lat:b.y});this.Ea.mo(this.hd,a,b)},remove:function(){this.dispatchEvent(new Q("onremove"),{type:"remove",target:this});this.Ea.TJ([this.hd])}});pk.Gn=new dc(q,{kf:"api"});function pk(a){z.lang.Ga.call(this);a&&(this.W=a,this.Ig=q,this.LG=a.P.clientWidth,this.KG=a.P.clientHeight,new rk(a,this))}pk.dP=D.Yh("pano");z.lang.wa(pk,z.lang.Ga,"PanoramaFlashWraper"); z.extend(pk.prototype,{aN:function(a){this.Qr("addMarkers",[a])},TJ:function(a){this.Qr("removeMarkers",[a])},mo:function(a,b,c){var e={};e.markerId=a;e[b]=c;this.set("markerProperty",e)},get:function(a){var b=q;"position"==a?(b=this.Ig.get("mercatorPosition"),b=dc.Ud.oj(new R(b.mercatorX,b.mercatorY))):b=this.Ig.get(a);return b},set:function(a,b){var c=this;"position"==a?pk.Gn.cj(b,function(a){a&&a.id?c.W.Ac(a.id):c.dispatchEvent(new Q("pano_error"))}):"id"==a?c.Ig==q?c.TR(c.W):c.Ig.set&&c.Ig.set("panoOptions", {id:b.id,panoType:b.type,width:c.LG,height:c.KG}):c.Ig&&c.Ig.set&&c.Ig.set(a,b)},Qr:function(a,b){return this.Ig.doAction(a,b)},W2:x("Kq"),TR:function(a){var b=this,c=a.m.swfSrc.match(/.*\\//)[0]+"BDStreetScape.swf";b.Ig=p;pk.Gn.Pw(function(e){var f="",g="";"inter"===a.Ie?g=a.bb:f=a.bb;f={pid:f,iid:g,panoType:a.Ie,heading:a.Ia.heading,pitch:a.Ia.pitch,width:b.LG,height:b.KG,panoUrl:c,panoTileUrl:pk.dP.join("|"),domain:dc.du,jsInterfaceNamespace:"BMap.PanoramaFlashInterface",swfIndex:b.da};g=a.m.swfSrc; e&&(e.panoUdt&&e.panoUdt.version&&f)&&(f.udtVersion=e.panoUdt.version);e&&(e.panoSwfAPI&&e.panoSwfAPI.version&&f)&&(f.panoUrl=f.panoUrl+"?version="+e.panoSwfAPI.version,g=g+"?version="+e.panoSwfAPI.version);b.Ig=b.nQ(a.P,f,g)})},nQ:function(a,b,c){var e=new qk,f="PanoramaFlash"+this.da,g=q,g=O("div");g.style.position="absolute";g.id="PanoramaFlashWraper"+this.da;g.style.top="0";g.style.left="0";g.style.height="100%";g.style.width="100%";g.style.zIndex=1200;this.Kq=g;a.appendChild(g);e.create({id:f, width:"100%",height:"100%",allowscriptaccess:"always",scale:"showall",wmode:"opaque",quality:"best",url:c,ver:"10.2",errorMessage:"\\u60a8\\u672a\\u5b89\\u88c5Flash Player\\u64ad\\u653e\\u5668\\u6216\\u8005\\u7248\\u672c\\u8fc7\\u4f4e",vars:b},g);return e.YK(f)}});var uk=pk.prototype;V(uk,{get:uk.get,set:uk.set,doAction:uk.Qr}); ');
